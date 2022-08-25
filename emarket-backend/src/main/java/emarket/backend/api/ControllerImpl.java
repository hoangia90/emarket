package emarket.backend.api;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import javax.net.ssl.SSLContext;

import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.TrustStrategy;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import emarket.backend.fhe.SEAL;
import emarket.backend.message.ResponseMessage;
import emarket.backend.model.BasicUser;
import emarket.backend.model.Description;
import emarket.backend.model.DrivingLicense;
import emarket.backend.model.DrivingLicenseUpdate;
import emarket.backend.model.FHEFileSystem;
import emarket.backend.model.ObjectValue;
import emarket.backend.model.User;
import emarket.backend.service.DrivingLicenseService;
import emarket.backend.service.FilesStorageService;
import emarket.backend.service.UserService;
import io.swagger.annotations.ApiParam;

@Configuration
@RestController
public class ControllerImpl implements Controller {

	@Value("${application.fheServerAnalysis}")
	String fheServerAnalysis;
	@Value("${application.fheServerData}")
	String fheServerData;

	private static final Logger logger = LoggerFactory.getLogger(ControllerImpl.class);

	@Autowired
	SEAL seal;

	@Autowired
	FilesStorageService storageService;

	@Autowired
	DrivingLicenseService drivingLicenseService;

	@Autowired
	UserService userService;

//	@PostMapping("/uploadfile")
	public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
		String message = "";
		try {
			storageService.save(file);
			message = "Uploaded the file successfully: " + file.getOriginalFilename();
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
			System.out.println(e.toString());
			message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}

//	@PostMapping("/uploadfiles")
	public ResponseEntity<ResponseMessage> uploadFiles(@RequestParam("files") MultipartFile[] files) {
		String message = "";
		try {
			storageService.saveAll(files);
//	      message = "Uploaded the file successfully: " + file.getOriginalFilename();
			message = "Uploaded the files successfully: ";
			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
		} catch (Exception e) {
//	      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
			message = "Could not upload all the files !";
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
		}
	}

	@Override
	public @ResponseBody ResponseEntity<String> checkDrivingLicenseByNoAuto(@RequestParam("number") String number,
			@RequestParam("partnerID") String partnerID) {
		try {
			// encrypt
			String filename = "temp";
			seal.createLicense(number, seal.getUploadDir(), filename);
			Path path = Paths.get(seal.getUploadDir() + filename + ".ct");
			// upload
			MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
			parameters.add("file", new FileSystemResource(path.toString()));
			parameters.add("partnerID", partnerID);
			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-Type", "multipart/form-data");
			headers.set("Accept", "text/plain");
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<String> res1 = restTemplate.postForEntity(
					fheServerAnalysis + "/openapi/v1/crud-data-master/check/drivingLicense/01-uploadFile",
					new HttpEntity<MultiValueMap<String, Object>>(parameters, headers), String.class);
			seal.deleteDir(path.toString());
			// check
			if (res1.getStatusCode().is2xxSuccessful()) {
				ResponseEntity<byte[]> res2 = checkLicense(partnerID, res1.getBody().toString());
				// decrypt
				if (res2.getStatusCode().is2xxSuccessful()) {
					String path2 = seal.getResultDir() + "/" + res1.getBody() + ".ct";
					Files.write(Paths.get(path2), res2.getBody());
					String result2 = seal.decryptCheckResult(path2);
					seal.deleteDir(path2);
					return new ResponseEntity<String>(result2, HttpStatus.OK);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public @ResponseBody ResponseEntity<byte[]> encryptLicense(
			@RequestParam(name = "number", required = true) String number) {
		try {
			// String resultDir = seal.getResultDir();
//			Path uploadDir = Paths.get(seal.getUploadDir());
			String filename = "temp";
			seal.createLicense(number, seal.getUploadDir(), filename);
			Path path = Paths.get(seal.getUploadDir() + filename + ".ct");
			byte[] returnData = Files.readAllBytes(path);
//			seal.deleteDir(path.toString());
			return new ResponseEntity<byte[]>(returnData, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public @ResponseBody ResponseEntity<String> uploadLicense(
			@RequestParam(name = "file", required = true) MultipartFile file,
			@RequestParam(name = "partnerID", required = true) String partnerID) {
		try {
			if (!file.isEmpty()) {
				byte[] bytes = file.getBytes();
				String filePath = seal.getUploadDir() + file.getOriginalFilename();
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
				stream.write(bytes);
				stream.close();

				MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
				parameters.add("file", new FileSystemResource(filePath));
				parameters.add("partnerID", partnerID);
				HttpHeaders headers = new HttpHeaders();
				headers.set("Content-Type", "multipart/form-data");
				headers.set("Accept", "text/plain");

				RestTemplate restTemplate = new RestTemplate();

				ResponseEntity<String> result = restTemplate.postForEntity(
						fheServerAnalysis + "/openapi/v1/crud-data-master/check/drivingLicense/01-uploadFile",
						new HttpEntity<MultiValueMap<String, Object>>(parameters, headers), String.class);
				seal.deleteDir(filePath);
				return result;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<String>("Could not upload the file!", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public @ResponseBody ResponseEntity<byte[]> checkLicense(
			@RequestParam(name = "partnerID", required = true) String partnerID,
			@RequestParam(name = "requestID", required = true) String requestID) {
		try {
			MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
			parameters.add("partnerID", partnerID);
			parameters.add("requestID", requestID);
			HttpHeaders headers = new HttpHeaders();
//		headers.set("Content-Type", "multipart/form-data");
			headers.set("Accept", "text/plain");
			RestTemplate restTemplate = new RestTemplate();
			byte[] result = restTemplate.postForObject(
					fheServerAnalysis + "/openapi/v1/crud-data-master/check/drivingLicense/02-checkByFile",
					new HttpEntity<MultiValueMap<String, Object>>(parameters, headers), byte[].class);

			return new ResponseEntity<byte[]>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> decryptCheckedResult(
			@RequestParam(name = "file", required = true) MultipartFile file) {
		try {
			ResponseEntity<ResponseMessage> re = uploadFile(file);
			System.out.println(re);
			String source = seal.getUploadDir() + file.getOriginalFilename();
			System.out.println(source);
			String result = seal.decryptCheckResult(source);
			seal.deleteDir(source);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> decryptLicense(@RequestParam(name = "file", required = true) MultipartFile file) {
		try {
			uploadFile(file);
			String fileextension = com.google.common.io.Files.getFileExtension(file.getOriginalFilename());
			String filename = com.google.common.io.Files.getNameWithoutExtension(file.getOriginalFilename());
			String result = seal.decrypt(seal.getUploadDir(), filename, fileextension);
			String source = seal.getUploadDir() + file.getOriginalFilename();
			seal.deleteDir(source);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<byte[]> downloadLicense(
			@ApiParam(name = "Id", value = "", example = "", required = true) @RequestParam(name = "Id") Integer Id,
			@ApiParam(name = "partnerID", value = "", example = "", required = true) @RequestParam("partnerID") String partnerID) {
		try {
			MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
			HttpHeaders headers = new HttpHeaders();
			parameters.add("Id", Id);
			parameters.add("partnerID", partnerID);
			headers.set("Accept", "*/*");
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<byte[]> result = restTemplate.exchange(
					fheServerAnalysis + "/openapi/v1/crud-data-master/check/drivingLicense/downloadFile",
					HttpMethod.POST, new HttpEntity<MultiValueMap<String, Object>>(parameters, headers), byte[].class);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<List<DrivingLicense>> getAllDrivingLicenses(
			@RequestParam(name = "partnerID", required = true) String partnerID) {
		try {
			MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
			HttpHeaders headers = new HttpHeaders();
			headers.set("Accept", "*/*");
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<List<DrivingLicense>> allDrivingLicenses = restTemplate.exchange(
					fheServerData + "/openapi/v1/crud-data-master/data/all/drivingLicenses?partnerID=" + partnerID,
					HttpMethod.GET, new HttpEntity<MultiValueMap<String, Object>>(parameters, headers),
					new ParameterizedTypeReference<List<DrivingLicense>>() {
					});
			return allDrivingLicenses;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<Description> createDrivingLicense(
			@RequestParam(name = "drivingLicenseNo", required = true) String drivingLicenseNo,
			@RequestParam(name = "partnerID", required = true) String partnerID,
			@RequestParam(name = "contractID", required = false) String contractID,
			@RequestParam(name = "status", required = false) Integer status,
			@RequestParam(name = "description", required = false) String description) {
		try {
//			Path uploadDir = Paths.get(seal.getSealDir() + "client/upload/");
			String filename = "temp";
			seal.createLicense(drivingLicenseNo, seal.getUploadDir(), filename);
			MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
			parameters.add("file", new FileSystemResource(seal.getUploadDir() + filename + ".ct"));
			parameters.add("partnerID", partnerID);
			parameters.add("contractID", contractID);
			parameters.add("status", status);
			parameters.add("description", description);
			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-Type", "multipart/form-data");
//			headers.set("Accept", "application/json");
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<Description> result = restTemplate.exchange(
					fheServerData + "/openapi/v1/crud-data-master/data/drivingLicense", HttpMethod.POST,
					new HttpEntity<MultiValueMap<String, Object>>(parameters, headers), Description.class);
			seal.deleteDir(seal.getUploadDir() + filename + ".ct");
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<ArrayList<Integer>> createDrivingLicenseData(
			@RequestParam(name = "drivingLicenseNo", required = true) String drivingLicenseNo,
			@RequestParam(name = "partnerID", required = true) String partnerID,
			@RequestParam(name = "contractID", required = false) String contractID,
			@RequestParam(name = "status", required = false) Integer status,
			@RequestParam(name = "description", required = false) String description) {
		try {
			ArrayList<Integer> result = new ArrayList<Integer>();
			for (int i = 0; i < 1000; i++) {
				ResponseEntity<Description> res = createDrivingLicense(drivingLicenseNo + "-" + i, partnerID,
						contractID, status, description);
				result.add(Integer.parseUnsignedInt(res.getBody().getValue()));
			}
			return new ResponseEntity<ArrayList<Integer>>(result, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<Description> updateDrivingLicense(
			@RequestBody(required = true) DrivingLicenseUpdate drivingLicenseUpdate) {
//			@RequestParam(name = "drivingLicenseUpdate", required = true) DrivingLicenseUpdate drivingLicenseUpdate) {
		try {
			Integer Id = drivingLicenseUpdate.getDriving_license_id();
			String drivingLicenseNo = drivingLicenseUpdate.getDriving_license_no();
			drivingLicenseUpdate.setDriving_license_no(null);
			String partnerID = drivingLicenseUpdate.getPartner_id();
			String contractID = drivingLicenseUpdate.getContract_id();
			Integer status = drivingLicenseUpdate.getStatus();
			String description = drivingLicenseUpdate.getDescription();

//			Path uploadDir = Paths.get(seal.getSealDir() + "client/upload/");
			String filename = "temp";
			seal.createLicense(drivingLicenseNo, seal.getUploadDir(), filename);
			MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
			parameters.add("file", new FileSystemResource(seal.getUploadDir() + filename + ".ct"));
			parameters.add("Id", Id);
			parameters.add("partnerID", partnerID);
			parameters.add("contractID", contractID);
			parameters.add("status", status);
			parameters.add("description", description);
			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-Type", "multipart/form-data");
			headers.set("Accept", "application/xml, application/json");
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<Description> result = restTemplate.exchange(
					fheServerData + "/openapi/v1/crud-data-master/data/drivingLicense", HttpMethod.PUT,
					new HttpEntity<MultiValueMap<String, Object>>(parameters, headers), Description.class);
			seal.deleteDir(seal.getUploadDir() + filename + ".ct");
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<Description> deleteDrivingLicense(@RequestParam(name = "id", required = true) Integer id,
			@RequestParam(name = "partnerId", required = true) String partnerId) {
		try {
			MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<String, Object>();
			parameters.add("id", id);
			parameters.add("partnerId", partnerId);
			HttpHeaders headers = new HttpHeaders();
			headers.set("Accept", "*/*");
			RestTemplate restTemplate = new RestTemplate();
			return restTemplate.exchange(fheServerData + "/openapi/v1/crud-data-master/data/drivingLicense",
					HttpMethod.DELETE, new HttpEntity<MultiValueMap<String, Object>>(parameters, headers),
					Description.class);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> decryptCheckedResults(
			@RequestParam(name = "file", required = true) MultipartFile file) {
		try {
			FHEFileSystem ffsf = new FHEFileSystem();
			ffsf.setContentBase64(file.getBytes());

			String[] strFiles = ffsf.getContentBase64().split("#####");

			String path = storageService.getFileDir().toString() + "/temp.ct";
			for (String strFile : strFiles) {
				FHEFileSystem ffs = new FHEFileSystem();
				ffs.setContentBase64(strFile);

				Files.write(Paths.get(path), ffs.getContentByteArray());
//		        System.out.println(res);
				String result = seal.decryptCheckResult(path);
				if (result.equals("1")) {
					seal.deleteDir(path);
					return new ResponseEntity<String>("1", HttpStatus.OK);
				}
			}
			seal.deleteDir(path);
			return new ResponseEntity<String>("0", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	String globalCookieSessionID;

	@Override
	public ResponseEntity<Description> servicelogin(String partnerLoginURL, String userName, String pw) {
		try {

			RestTemplate testRestTemplate = new RestTemplate();
			logger.debug("Testing Login & ping to partner {}", partnerLoginURL);

			MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
			form.add("username", userName);
			form.add("password", pw);
			ResponseEntity<String> response = testRestTemplate.postForEntity(partnerLoginURL, form, String.class);

			assert (response.getStatusCode() == HttpStatus.FOUND);

			String cookieSessionID = response.getHeaders().get("Set-Cookie").get(0).split(";")[0];
			logger.debug("Response Code ({}) and body = ({}) ", response.getStatusCode(), response.getBody());
			logger.debug("Response =  " + response.getHeaders().toString());
			logger.debug("Cookie : " + cookieSessionID);

			Description headers = new Description().message("Cookie").value(cookieSessionID);

			this.globalCookieSessionID = cookieSessionID;

			System.out.println("Signed in with cookie session ID: " + this.globalCookieSessionID);

			return new ResponseEntity<Description>(headers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	public String servicelogin2(String partnerLoginURL, String userName, String pw) {
		try {

//			ResponseEntity<TokenModel> response = null;
			TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;
			SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
					.loadTrustMaterial(null, acceptingTrustStrategy).build();
			SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext);
			CloseableHttpClient httpClient = HttpClients.custom().setSSLSocketFactory(csf).build();
			HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
			requestFactory.setHttpClient(httpClient);

			RestTemplate testRestTemplate = new RestTemplate(requestFactory);

			logger.debug("Testing Login & ping to partner {}", partnerLoginURL);

			MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
			form.add("username", userName);
			form.add("password", pw);
			ResponseEntity<String> response = testRestTemplate.postForEntity(partnerLoginURL, form, String.class);

			assert (response.getStatusCode() == HttpStatus.FOUND);

			String cookieSessionID = response.getHeaders().get("Set-Cookie").get(0).split(";")[0];
			logger.debug("Response Code ({}) and body = ({}) ", response.getStatusCode(), response.getBody());
			logger.debug("Response =  " + response.getHeaders().toString());
			logger.debug("Cookie : " + cookieSessionID);
			return cookieSessionID;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";

	}

	@Override
	public ResponseEntity<Object> proxyGet(String URL, String cookieSessionID) {
		try {
			if (cookieSessionID == null) {
				cookieSessionID = this.globalCookieSessionID;
			}
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.add("Cookie", cookieSessionID);
			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<Object> response = restTemplate.exchange(URL, HttpMethod.GET,
					new HttpEntity<Object>(headers), Object.class);
			return response;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public @ResponseBody ResponseEntity<String> thresholdEncrypt(
//			@RequestParam("FHEModel") String FHEModel,
			@RequestParam("contractId") String contractId, 
			@RequestParam("partnerId") String partnerId,
			@RequestParam("requestId") String requestId, 
//			@RequestParam("isWithPubKey") Boolean isWithPubKey,
			@RequestBody ObjectValue objectValue) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-Type", "application/json");
			headers.set("Accept", "application/json");
			headers.set("Cookie", this.globalCookieSessionID);

			System.out.println("Encrypt with cookie session ID: " + this.globalCookieSessionID);

//			URI uri = new URI("https://" + partnerId + ".bigpi.eu:8443/api/dsp-fhe-encrypt/openapi/v1/fhe/encrypt/"
//					+ requestId + "/" + partnerId + "/dsa/" + contractId + "/scheme/" + FHEModel );
			
			URI uri = new URI("https://" + partnerId + ".bigpi.eu:8443/api/dsp-fhe-encrypt/openapi/v1/fhe/encrypt/"
					+ requestId + "/" + partnerId + "/dsa/" + contractId + "/scheme/" + "seal");

			HttpEntity<ObjectValue> httpEntity = new HttpEntity<ObjectValue>(objectValue, headers);

			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<Object> res = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
			if (res.getStatusCode().is2xxSuccessful()) {
				ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
				String json = ow.writeValueAsString(res.getBody());
				return new ResponseEntity<String>(json, HttpStatus.OK);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public @ResponseBody ResponseEntity<String> sendRequestToFactory(
//			@RequestParam("category") String category,
//			@RequestParam("title") String title, 
			@RequestParam("contractId") String contractId,
//			@RequestParam("description") String description, 
			@RequestParam("partnerId") String partnerId,
//			@RequestBody ObjectValue objectValue
			@RequestParam(name = "file") MultipartFile file) {
		try {
			String cookieSectionID = this.servicelogin2("https://gateway.bigpi.eu:8443/login", "bigpiadmin",
					"BigadminPi;123");

			String content = new String(file.getBytes());

			JSONParser parser = new JSONParser();
			JSONObject jsonObj = (JSONObject) parser.parse(content);

			String message = (String) jsonObj.get("dateTime");
			String value = Base64.getEncoder().encodeToString(file.getBytes());
			String contractId2 = contractId;
//			String description2 = description;
			String hash = (String) jsonObj.get("hashValue");

//			String strJson = "{  \"additionalProperties\": [" + "    {" + "      \"message\": \"" + message + "\","
//					+ "      \"value\": \"" + value + "\"" + "    }" + "  ]," + "  \"contractId\": \"" + contractId2
//					+ "\"," + "  \"description\": \"" + description + "\"," + "  \"hash\": \"" + hash + "\","
//					+ "  \"partnerId\": \"" + partnerId + "\"," + "  \"sessionId\": \"" + message + "\" }";
//
//			URI uri = new URI("https://gateway.bigpi.eu:8443/api/fhe-event-producer/v1/producer/publish/" + category
//					+ "/" + title);
			
			String strJson = "{  \"additionalProperties\": [" + "    {" + "      \"message\": \"" + message + "\","
					+ "      \"value\": \"" + value + "\"" + "    }" + "  ]," + "  \"contractId\": \"" + contractId2
					+ "\"," + "  \"description\": \"" + "demo" + "\"," + "  \"hash\": \"" + hash + "\","
					+ "  \"partnerId\": \"" + partnerId + "\"," + "  \"sessionId\": \"" + message + "\" }";

			URI uri = new URI("https://gateway.bigpi.eu:8443/api/fhe-event-producer/v1/producer/publish/" + "dataTimeStamp"
					+ "/" + "demo");

			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-Type", "application/json");
			headers.set("Accept", "application/json");
			headers.set("Cookie", cookieSectionID);

			HttpEntity<String> httpEntity = new HttpEntity<String>(strJson, headers);

			TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;
			SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
					.loadTrustMaterial(null, acceptingTrustStrategy).build();
			SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext);
			CloseableHttpClient httpClient = HttpClients.custom().setSSLSocketFactory(csf).build();
			HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
			requestFactory.setHttpClient(httpClient);
			RestTemplate restTemplate = new RestTemplate(requestFactory);

//			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<Description> res1 = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Description.class);
			return new ResponseEntity<String>(res1.getBody().getValue(), HttpStatus.OK);

//			return new ResponseEntity<String>(strJson, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public @ResponseBody ResponseEntity<String> getResult(@RequestParam("partnerId") String partnerId,
			@RequestParam("contractId") String contractId,
			@RequestParam("analysisReferenceId") String analysisReferenceId) {
		try {
//			https://gateway.bigpi.eu:8443/api/analysis-result-service/openapi/v1/bigpi-analysis-result/fhe/metadata/ecorridorcnr/3/1227
			URI uri = new URI(
					"https://" + partnerId + ".bigpi.eu:8443/api/dap-analysis-result/openapi/v1/bigpi-analysis-result/"
							+ partnerId + "/" + contractId + "/" + analysisReferenceId);

			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-Type", "application/json");
			headers.set("Accept", "application/json");
			headers.set("Cookie", this.globalCookieSessionID);

			HttpEntity<String> httpEntity = new HttpEntity<String>(null, headers);

			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<String> res1 = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, String.class);
			return new ResponseEntity<String>(res1.getBody().toString(), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public @ResponseBody ResponseEntity<String> decryptData(@RequestParam("contractId") String contractId,
			@RequestParam("partnerId") String partnerId, @RequestParam("requestId") String requestId,
			@RequestParam(name = "file") MultipartFile file) {
		try {

			String content = new String(file.getBytes());

//			JSONParser parser = new JSONParser();
//			JSONObject jsonObj = (JSONObject) parser.parse(content);

			URI uri = new URI("https://" + partnerId + ".bigpi.eu:8443/api/dsp-fhe-encrypt/openapi/v1/fhe/decrypt/v2/"
					+ requestId + "/" + partnerId + "/dsa/" + contractId);

			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-Type", "application/json");
			headers.set("Accept", "application/json");
			headers.set("Cookie", this.globalCookieSessionID);

			HttpEntity<String> httpEntity = new HttpEntity<String>(content, headers);

			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<Description> res1 = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Description.class);
			return new ResponseEntity<String>(res1.getBody().getValue(), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<String> encryptPatternSearch(
//			@RequestParam("FHEModel") String FHEModel,
			@RequestParam("contractId") String contractId, 
			@RequestParam("partnerId") String partnerId,
			@RequestParam("requestId") String requestId, 
//			@RequestParam("isWithPubKey") Boolean isWithPubKey,
//			@RequestParam("coreFunctionId") String coreFunctionId, 
			@RequestBody ObjectValue objectValue) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-Type", "application/json");
			headers.set("Accept", "application/json");
			headers.set("Cookie", this.globalCookieSessionID);

			System.out.println("Encrypt with cookie session ID: " + this.globalCookieSessionID);

//			URI uri = new URI("https://ecorridor-fhe.iit.cnr.it:8443/api/dsp-fhe-encrypt/openapi/v1/fhe/encrypt/"
//					+ requestId + "/" + partnerId + "/dsa/" + contractId + "/scheme/" + FHEModel + "?coreFunctionId="
//					+ coreFunctionId + "&isWithPubKey=" + isWithPubKey);
			
			URI uri = new URI("https://ecorridor-fhe.iit.cnr.it:8443/api/dsp-fhe-encrypt/openapi/v1/fhe/encrypt/"
					+ requestId + "/" + partnerId + "/dsa/" + contractId + "/scheme/" + "seal" + "?coreFunctionId="
					+ "FHES-PATTERN_SEARCH_V2" + "&isWithPubKey=" + "false");

			HttpEntity<ObjectValue> httpEntity = new HttpEntity<ObjectValue>(objectValue, headers);

			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<Object> res = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
			if (res.getStatusCode().is2xxSuccessful()) {
				ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
				String json = ow.writeValueAsString(res.getBody());
				return new ResponseEntity<String>(json, HttpStatus.OK);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@Override
	public @ResponseBody ResponseEntity<String> sendRequestToFactoryPatternSearch(
//			@RequestParam("category") String category,
//			@RequestParam("title") String title, 
			@RequestParam("contractId") String contractId, 
			@RequestParam("data-reference-contract") String dataReferenceContract,
//			@RequestParam("description") String description, 
			@RequestParam("partnerId") String partnerId,
//			@RequestBody ObjectValue objectValue
			@RequestParam(name = "file") MultipartFile file) {
		try {
			String cookieSectionID = this.servicelogin2("https://gateway.bigpi.eu:8443/login", "bigpiadmin",
					"BigadminPi;123");

			String content = new String(file.getBytes());

			JSONParser parser = new JSONParser();
			JSONObject jsonObj = (JSONObject) parser.parse(content);

			String message = (String) jsonObj.get("dateTime");
			String value = Base64.getEncoder().encodeToString(file.getBytes());
			String contractId2 = contractId;
//			String description2 = description;
			String hash = (String) jsonObj.get("hashValue");

//			String strJson = "{  \"additionalProperties\": [" + "    {" + "      \"message\": \"" + message + "\","
//					+ "      \"value\": \"" + value + "\"" + "    }" + "  ]," + "  \"contractId\": \"" + contractId2
//					+ "\"," + "  \"description\": \"" + description + "\"," + "  \"hash\": \"" + hash + "\","
//					+ "  \"partnerId\": \"" + partnerId + "\"," + "  \"sessionId\": \"" + message + "\" }";
//
////			https://gateway.bigpi.eu:8443/api/fhe-event-producer/v1/producer/publish/dataTimeStamp/demo?data-reference-contract=123
//			URI uri = new URI("https://gateway.bigpi.eu:8443/api/fhe-event-producer/v1/producer/publish/" + category
//					+ "/" + title + "?data-reference-contract" + dataReferenceContract);

			String strJson = "{  \"additionalProperties\": [" + "    {" + "      \"message\": \"" + message + "\","
					+ "      \"value\": \"" + value + "\"" + "    }" + "  ]," + "  \"contractId\": \"" + contractId2
					+ "\"," + "  \"description\": \"" + "demo" + "\"," + "  \"hash\": \"" + hash + "\","
					+ "  \"partnerId\": \"" + partnerId + "\"," + "  \"sessionId\": \"" + message + "\" }";

//			https://gateway.bigpi.eu:8443/api/fhe-event-producer/v1/producer/publish/dataTimeStamp/demo?data-reference-contract=123
			URI uri = new URI("https://gateway.bigpi.eu:8443/api/fhe-event-producer/v1/producer/publish/" + "dataTimeStamp"
					+ "/" + "demo" + "?data-reference-contract" + dataReferenceContract);
			
			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-Type", "application/json");
			headers.set("Accept", "application/json");
			headers.set("Cookie", cookieSectionID);

			HttpEntity<String> httpEntity = new HttpEntity<String>(strJson, headers);

			TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;
			SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
					.loadTrustMaterial(null, acceptingTrustStrategy).build();
			SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext);
			CloseableHttpClient httpClient = HttpClients.custom().setSSLSocketFactory(csf).build();
			HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
			requestFactory.setHttpClient(httpClient);
			RestTemplate restTemplate = new RestTemplate(requestFactory);

//			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<Description> res1 = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Description.class);
			return new ResponseEntity<String>(res1.getBody().getValue(), HttpStatus.OK);

//			return new ResponseEntity<String>(strJson, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@Override
	public @ResponseBody ResponseEntity<String> getResultPatternSearch(@RequestParam("partnerId") String partnerId,
			@RequestParam("contractId") String contractId,
			@RequestParam("analysisReferenceId") String analysisReferenceId) {
		try {
//			https://gateway.bigpi.eu:8443/api/analysis-result-service/openapi/v1/bigpi-analysis-result/fhe/metadata/ecorridorcnr/3/1227
//			https://ecorridor-fhe.iit.cnr.it:8443/api/dap-analysis-result/openapi/v1/bigpi-analysis-result/ecorridorcnr/3/1227
			URI uri = new URI(
					"https://ecorridor-fhe.iit.cnr.it:8443/api/dap-analysis-result/openapi/v1/bigpi-analysis-result/"
							+ partnerId + "/" + contractId + "/" + analysisReferenceId);

			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-Type", "application/json");
			headers.set("Accept", "application/json");
			headers.set("Cookie", this.globalCookieSessionID);

			HttpEntity<String> httpEntity = new HttpEntity<String>(null, headers);

			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<String> res1 = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, String.class);
			return new ResponseEntity<String>(res1.getBody().toString(), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public @ResponseBody ResponseEntity<String> decryptPatternSearch(@RequestParam("contractId") String contractId,
			@RequestParam("partnerId") String partnerId, @RequestParam("requestId") String requestId,
//			@RequestParam("coreFunctionId") String coreFunctionId, 
			@RequestParam(name = "file") MultipartFile file) {
		try {

//			String content = new String(file.getBytes());
//			URI uri = new URI(
//					"https://ecorridor-fhe.iit.cnr.it:8443/api/dsp-fhe-encrypt/openapi/v1/fhe/decrypt/with-core-function/"
//							+ requestId + "/" + partnerId + "/dsa/" + contractId + "?coreFunctionId=" + coreFunctionId);
			String content = new String(file.getBytes());
			URI uri = new URI(
					"https://ecorridor-fhe.iit.cnr.it:8443/api/dsp-fhe-encrypt/openapi/v1/fhe/decrypt/with-core-function/"
							+ requestId + "/" + partnerId + "/dsa/" + contractId + "?coreFunctionId=" + "FHES-PATTERN_SEARCH_V2");
	

			HttpHeaders headers = new HttpHeaders();
			headers.set("Content-Type", "application/json");
			headers.set("Accept", "application/json");
			headers.set("Cookie", this.globalCookieSessionID);

			HttpEntity<String> httpEntity = new HttpEntity<String>(content, headers);

			RestTemplate restTemplate = new RestTemplate();
			ResponseEntity<Description> res1 = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Description.class);
			return new ResponseEntity<String>(res1.getBody().getValue(), HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

//	@Override
//	public ResponseEntity<List<User>> getUsers() {
//		// TODO Auto-generated method stub
//		return null;
//	}

	// Get All Users
//	@GetMapping("/users")
	@Override
	public ResponseEntity<List<User>> getUsers() {
		try {
			List<User> users = userService.getUsers();
			return new ResponseEntity<List<User>>(users, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@Override
	public ResponseEntity<User> getUserById(@RequestParam(name = "id", required = true) Integer id) {
		try {
			User user = userService.getUserById(id);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<Description> createOrUpdateUser(@RequestBody User user) {
		try {
			User new_user = new User();
			new_user = userService.saveOrUpdate(user);
			return new ResponseEntity<Description>(new Description().value("" + new_user.getUsername()),
					HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<Description> deleteUser(@RequestParam(name = "id", required = true) Integer id) {
		try {
			userService.delete(id);
			return new ResponseEntity<Description>(new Description().value("Deleted sucessfully !"), HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<List<BasicUser>> getBasicUsers() {
		try {
			List<BasicUser> basicUsers = userService.getBasicUsers();
			return new ResponseEntity<List<BasicUser>>(basicUsers, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Override
	public ResponseEntity<User> authenticateUser(@RequestBody User user) {
		try {
			System.out.println(user.toString());
			User return_user = userService.authenticate(user.getUsername(), user.getPassword());

			if (return_user != null) {
				return_user.setPassword("");
				return_user.setToken("fake-jwt-token");
				System.out.println("aloalo1" + return_user);
				return new ResponseEntity<User>(return_user, HttpStatus.OK);
			} else {
				System.out.println("aloalo2" + return_user);
//				return new ResponseEntity<User>(return_user, HttpStatus.NOT_FOUND);
				return new ResponseEntity<User>(return_user, HttpStatus.OK);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

//	@Override
//	public ResponseEntity<List<String>> getDatabase(Integer id) {
//		try {
////			if (this.globalCookieSessionID == null) {
////				cookieSessionID = this.globalCookieSessionID;
////			}
//			
//			String cookieSectionID = this.servicelogin2("https://api.bigpi.eu:8443/login", "bigpiadmin",
//					"BigadminPi;123");
//			
//			HttpHeaders headers = new HttpHeaders();
//			headers.setContentType(MediaType.APPLICATION_JSON);
//			headers.add("Cookie", this.globalCookieSessionID);
//			RestTemplate restTemplate = new RestTemplate();
//			https://api.bigpi.eu:8443/api/dmp-data-reference/openapi/v1/bigpi-data-reference/fhe-data/ecorridorcnr/3/details/
//			URI uri = new URI(
//					"https://ecorridor-fhe.iit.cnr.it:8443/api/dsp-fhe-encrypt/openapi/v1/fhe/decrypt/with-core-function/"
//							+ requestId + "/" + partnerId + "/dsa/" + contractId + "?coreFunctionId=" + "FHES-PATTERN_SEARCH_V2");
//			
//			ResponseEntity<List<String>> response = restTemplate.exchange(URL, HttpMethod.GET,
//					new HttpEntity<Object>(headers), Object.class);
//			return response;
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//	}

	// Error handling
//	public static long checkDrivingLicenseNoInput(String drivingLicenseNoString) throws Exception {
//		long drivingLicenseNo;
//		try {
//			drivingLicenseNo = Long.parseLong(drivingLicenseNoString);
//		} catch (Exception ex) {
////			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
//			throw new Exception("Driving License Number should contain only numbers and not be empty or blank", ex);
//		}
//		return drivingLicenseNo;
//	}
//
//	public static boolean isNumeric(String strNum) {
//		if (strNum == null) {
//			return false;
//		}
//		try {
//			@SuppressWarnings("unused")
//			double d = Double.parseDouble(strNum);
//		} catch (NumberFormatException nfe) {
//			return false;
//		}
//		return true;
//	}

//	@Override
//	public ResponseEntity<DrivingLicense> getDecryptedDrivingLicense(@RequestParam(name = "Id") Integer Id) {
//		try {
//			DrivingLicense drivinglicense = drivingLicenseService.getDrivingLicenseById(Id);
//			drivinglicense.setDrivingLicenseNo(seal.decrypt(drivinglicense.getDrivingLicenseNo(),
//					drivinglicense.getDrivingLicenseId().toString()));
//
//			return new ResponseEntity<DrivingLicense>(drivinglicense, HttpStatus.OK);
//		} catch (Exception e) {
//			e.printStackTrace();
//
//		}
//		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//	}

//	@PostMapping("/openapi/v1/client/drivingLicense/03-check")
//	//public ResponseEntity<ByteArrayResource> checkLicense(@RequestParam("file") MultipartFile file) throws Exception {
//	public @ResponseBody byte[] checkLicense(@RequestParam("file") MultipartFile file) throws Exception {
//		ResponseEntity<ResponseMessage> re = uploadFile(file);
//		String source = storageService.getFileDir() + "/" + file.getOriginalFilename();
//		List<Users> allUsers = userService.getAllUsers();
//		ArrayList<String> data = new ArrayList<String>();
//		for (Users user : allUsers) {
//			data.add(user.getDrivingLicenseNo() + seal.getFilename() + ".ct");
//		}
//		boolean result = seal.checkLicense(source, data);
//		System.out.println(result);
//		Path path = Paths.get(seal.getResultDir() + seal.getFilename() + ".ct");
//		byte[] returnData = Files.readAllBytes(path);
//		return returnData;
//	}

//	@PutMapping("/user/{userid}")
//	private Users update(@RequestBody Users user, @PathVariable("userid") int userid) {
//		Users oldUser = userService.getUserById(user.getUserId());
//		
//		if(!user.getDrivingLicenseNo().equals(oldUser.getDrivingLicenseNo()) && isNumeric(user.getDrivingLicenseNo())) {		
//			cin.createLicense(Long.parseLong(user.getDrivingLicenseNo()), oldUser.getDrivingLicenseNo());
//			user.setDrivingLicenseNo(oldUser.getDrivingLicenseNo());
//		}
//		
//		userService.update(user, userid);
//		return user;
//	}

//	@GetMapping("/drivinglicense")
//	private Users checkLicense(@RequestParam("no") long no) {
//		List<Users> allUsers = userService.getAllUsers();
//		for (Users user : allUsers) {
//			cin.exec1(no, user.getDrivingLicenseNo());
//			if (cin.decryptBit()) {
//				cin.deleteResult();
//				return user;
//			}
//		}
//		return null;
//	}

//	// Not so convenient
//	@GetMapping("/files")
//	public ResponseEntity<List<FileInfo>> getListFiles() {
//		List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
//			String filename = path.getFileName().toString();
//			String url = MvcUriComponentsBuilder
//					.fromMethodName(Controller.class, "getFile", path.getFileName().toString()).build().toString();
//
//			return new FileInfo(filename, url);
//		}).collect(Collectors.toList());
//
//		return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
//	}

//	@GetMapping("/files/{filename:.+}")
//	@ResponseBody
//	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
//		Resource file = storageService.load(filename);
//		return ResponseEntity.ok()
//				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
//				.body(file);
//	}

//	// Get a specific user
//	@GetMapping("/user/{id}")
//	private Users getUser(@PathVariable("id") int id) throws Exception {
//		Users user = userService.getUserById(id);
//		System.out.println(user.getDrivingLicenseNo());
//		user.setDrivingLicenseNo(seal.decrypt(user.getDrivingLicenseNo()));
//		return user;
//	}

//	// Create a user with auto-Incrementing id or update a user with its id
//	@PostMapping("/user")
//	private Users createOrSaveUser(@RequestBody Users user) {
//
//		String uniqueID = seal.createLicense(user.getDrivingLicenseNo());
//		user.setDrivingLicenseNo(uniqueID);
//		userService.saveOrUpdate(user);
//		return user;
//
////		version 1
////		long drivingLicenseNo = checkDrivingLicenseNoInput(user.getDrivingLicenseNo());
////		
////		String uniqueID = cin.createLicense(drivingLicenseNo);
////		user.setDrivingLicenseNo(uniqueID);
////		userService.saveOrUpdate(user);
////		return user;
//	}

	// Update a user, for updating the driving license number filed, a new input
	// license number will be update automatically
//	@PutMapping("/user")
//	private Users update(@RequestBody Users user) {
//		Users oldUser = userService.getUserById(user.getUserId());
//		if (!user.getDrivingLicenseNo().equals(oldUser.getDrivingLicenseNo())) {
//			seal.createLicense(user.getDrivingLicenseNo(), oldUser.getDrivingLicenseNo());
//			user.setDrivingLicenseNo(oldUser.getDrivingLicenseNo());
//		}
//		userService.saveOrUpdate(user);
//		return user;
//	}
//	@PutMapping("/user")
//	private Users update(@RequestBody Users user) {
//		Users oldUser = userService.getUserById(user.getUserId());
//
//		long drivingLicenseNo = checkDrivingLicenseNoInput(user.getDrivingLicenseNo());
//
//		if (!user.getDrivingLicenseNo().equals(oldUser.getDrivingLicenseNo())) {
//			cin.createLicense(drivingLicenseNo, oldUser.getDrivingLicenseNo());
//			user.setDrivingLicenseNo(oldUser.getDrivingLicenseNo());
//			System.out.println("bugggg");
//		}
//
//		userService.saveOrUpdate(user);
//		return user;
//	}

//	// Delete a specified user
//	@DeleteMapping("/user/{id}")
//	private void deleteUser(@PathVariable("id") int id) {
//		Users user = userService.getUserById(id);
//		seal.deleteDir(user.getDrivingLicenseNo());
//		userService.delete(id);
//	}

	// Check a user driving license without knowing it by indicating the folder name
	// which contains it's tfhe encrypted files
	// The folder located in upload folder - folder name input required
//	@GetMapping("/check/{dir}")
//	private Users checkLicense(@PathVariable("dir") String dir) throws Exception {
//		List<Users> allUsers = userService.getAllUsers();
//		for (Users user : allUsers) {
////			System.out.println(dir + " vs " +user.getDrivingLicenseNo());
//			String path = "upload/" + dir + "/";
////			boolean result = seal.checkLicense(path, user.getDrivingLicenseNo().toString());
////			System.out.println(result);
////			if (result) {
////				return user;
////			}
//		}
//		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
//		// return null;
//	}

}

//@RestController
//public class Controller {
//	// private static final String template = "Hello, %s!";
//	// private final AtomicLong counter = new AtomicLong();
//
//	private Cingulata cin = new Cingulata();
//
//	// autowire the UsersService class
//	@Autowired
//	Service userService;
//
//	//@Autowired
//	FilesStorageService storageService;
//
//	@RequestMapping(value="/hello", method=RequestMethod.GET)
//	private String hello() {
//		return "Hello";
//	}
//
//	// Get All Users
//	@GetMapping("/users")
//	private List<Users> getAllUsers() {
//		return userService.getAllUsers();
//	}
//
//	// Get a specific user
//	@GetMapping("/user/{id}")
//	private Users getUser(@PathVariable("id") int id) throws Exception {
//		Users user = userService.getUserById(id);
//		System.out.println(user.getDrivingLicenseNo());
//		user.setDrivingLicenseNo(cin.decryptMultiBitArray(user.getDrivingLicenseNo()));
//		return user;
//	}
//
//	// Create a user with auto-Incrementing id or update a user with its id
//	@PostMapping("/user")
//	private Users createOrSaveUser(@RequestBody Users user) {
//		
//		String uniqueID = cin.createLicense(user.getDrivingLicenseNo());
//		user.setDrivingLicenseNo(uniqueID);
//		userService.saveOrUpdate(user);
//		return user;
//		
////		version 1
////		long drivingLicenseNo = checkDrivingLicenseNoInput(user.getDrivingLicenseNo());
////		
////		String uniqueID = cin.createLicense(drivingLicenseNo);
////		user.setDrivingLicenseNo(uniqueID);
////		userService.saveOrUpdate(user);
////		return user;
//	}
//
//	// Update a user, for updating the driving license number filed, a new input
//	// license number will be update automatically
//	@PutMapping("/user")
//	private Users update(@RequestBody Users user) {
//		Users oldUser = userService.getUserById(user.getUserId());
//		if (!user.getDrivingLicenseNo().equals(oldUser.getDrivingLicenseNo())) {
//			cin.createLicense(user.getDrivingLicenseNo(), oldUser.getDrivingLicenseNo());
//			user.setDrivingLicenseNo(oldUser.getDrivingLicenseNo());
//		}
//		userService.saveOrUpdate(user);
//		return user;
//	}
////	@PutMapping("/user")
////	private Users update(@RequestBody Users user) {
////		Users oldUser = userService.getUserById(user.getUserId());
////
////		long drivingLicenseNo = checkDrivingLicenseNoInput(user.getDrivingLicenseNo());
////
////		if (!user.getDrivingLicenseNo().equals(oldUser.getDrivingLicenseNo())) {
////			cin.createLicense(drivingLicenseNo, oldUser.getDrivingLicenseNo());
////			user.setDrivingLicenseNo(oldUser.getDrivingLicenseNo());
////			System.out.println("bugggg");
////		}
////
////		userService.saveOrUpdate(user);
////		return user;
////	}
//
//	// Delete a specified user
//	@DeleteMapping("/user/{id}")
//	private void deleteUser(@PathVariable("id") int id) {
//		Users user = userService.getUserById(id);
//		cin.deleteDir(user.getDrivingLicenseNo());
//		userService.delete(id);
//	}
//
//	// Check a user driving license without knowing it by indicating the folder name
//	// which contains it's tfhe encrypted files
//	// The folder located in upload folder - folder name input required
//	@GetMapping("/check/{dir}")
//	private Users checkLicense(@PathVariable("dir") String dir) throws Exception {
//		List<Users> allUsers = userService.getAllUsers();
//		for (Users user : allUsers) {
////			System.out.println(dir + " vs " +user.getDrivingLicenseNo());
//			String path = "upload/" + dir + "/";
//			boolean result = cin.checkLicense(path, user.getDrivingLicenseNo().toString());
//			System.out.println(result);
//			if (result) {
//				return user;
//			}
//		}
//		throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
//		// return null;
//	}
//
//	// Upload a license number in upload folder for checking - folder name and
//	// license number iputs are required
//	@GetMapping("/upload")
//	private HashMap<String, String> uploadLicense(@RequestParam("number") String number,
//			@RequestParam("dir") String dir) {
//		String path = "upload/" + dir + "/";
//		cin.createLicense(number, path);
//
//		HashMap<String, String> map = new HashMap<>();
//		map.put("path", path);
//
//		return map;
//	}
//
//	// Error handling
//	public static long checkDrivingLicenseNoInput(String drivingLicenseNoString) {
//		long drivingLicenseNo;
//		try {
//			drivingLicenseNo = Long.parseLong(drivingLicenseNoString);
//		} catch (Exception ex) {
//			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
//					"Driving License Number should contain only numbers and not be empty or blank", ex);
//		}
//		return drivingLicenseNo;
//	}
//
//	public static boolean isNumeric(String strNum) {
//		if (strNum == null) {
//			return false;
//		}
//		try {
//			@SuppressWarnings("unused")
//			double d = Double.parseDouble(strNum);
//		} catch (NumberFormatException nfe) {
//			return false;
//		}
//		return true;
//	}
//	
//
//
////	@PutMapping("/user/{userid}")
////	private Users update(@RequestBody Users user, @PathVariable("userid") int userid) {
////		Users oldUser = userService.getUserById(user.getUserId());
////		
////		if(!user.getDrivingLicenseNo().equals(oldUser.getDrivingLicenseNo()) && isNumeric(user.getDrivingLicenseNo())) {		
////			cin.createLicense(Long.parseLong(user.getDrivingLicenseNo()), oldUser.getDrivingLicenseNo());
////			user.setDrivingLicenseNo(oldUser.getDrivingLicenseNo());
////		}
////		
////		userService.update(user, userid);
////		return user;
////	}
//
////	@GetMapping("/drivinglicense")
////	private Users checkLicense(@RequestParam("no") long no) {
////		List<Users> allUsers = userService.getAllUsers();
////		for (Users user : allUsers) {
////			cin.exec1(no, user.getDrivingLicenseNo());
////			if (cin.decryptBit()) {
////				cin.deleteResult();
////				return user;
////			}
////		}
////		return null;
////	}
//
//	// Not so convenient
//	@GetMapping("/files")
//	public ResponseEntity<List<FileInfo>> getListFiles() {
//		List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
//			String filename = path.getFileName().toString();
//			String url = MvcUriComponentsBuilder
//					.fromMethodName(Controller.class, "getFile", path.getFileName().toString()).build().toString();
//
//			return new FileInfo(filename, url);
//		}).collect(Collectors.toList());
//
//		return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
//	}
//
//	@GetMapping("/files/{filename:.+}")
//	@ResponseBody
//	public ResponseEntity<Resource> getFile(@PathVariable String filename) {
//		Resource file = storageService.load(filename);
//		return ResponseEntity.ok()
//				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
//				.body(file);
//	}
//
//	@PostMapping("/uploadfile")
//	public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
//		String message = "";
//		try {
//			storageService.save(file);
//
//			message = "Uploaded the file successfully: " + file.getOriginalFilename();
//			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
//		} catch (Exception e) {
//			message = "Could not upload the file: " + file.getOriginalFilename() + "!";
//			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
//		}
//	}
//
//	@PostMapping("/uploadfiles")
//	public ResponseEntity<ResponseMessage> uploadFiles(@RequestParam("files") MultipartFile[] files) {
//		String message = "";
//		try {
//			storageService.saveAll(files);
//
////	      message = "Uploaded the file successfully: " + file.getOriginalFilename();
//			message = "Uploaded the files successfully: ";
//			return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
//		} catch (Exception e) {
////	      message = "Could not upload the file: " + file.getOriginalFilename() + "!";
//			message = "Could not upload all the files !";
//			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
//		}
//	}
//
//}
