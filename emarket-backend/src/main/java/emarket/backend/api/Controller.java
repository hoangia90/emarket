package emarket.backend.api;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import emarket.backend.model.BasicUser;
import emarket.backend.model.Description;
import emarket.backend.model.DrivingLicense;
import emarket.backend.model.DrivingLicenseUpdate;
import emarket.backend.model.ObjectValue;
import emarket.backend.model.User;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RequestMapping("/openapi/v1")
public interface Controller {

	final Logger logger = LoggerFactory.getLogger(Controller.class.getName());

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@GetMapping("/client/drivingLicense/01-encrypt")
	@ApiOperation(value = "Encrypt Driving License", notes = "This method encrypts a driving license number into encrypted .ct file", tags = {
			"Driving License - Analysis", })
	public @ResponseBody ResponseEntity<byte[]> encryptLicense(
			@ApiParam(name = "number", value = "Any Character", example = "", required = true) @RequestParam("number") String number);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/drivingLicense/02-upload")
	@ApiOperation(value = "Upload Encrypted Driving License Number File (.ct)", notes = "This method uploads a driving license number file and return the requestID number", tags = {
			"Driving License - Analysis", })
	public @ResponseBody ResponseEntity<String> uploadLicense(
			@ApiParam(name = "file", value = "", example = "", required = true) @RequestParam("file") MultipartFile file,
			@ApiParam(name = "partnerID", value = "", example = "", required = true) @RequestParam("partnerID") String partnerID);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@GetMapping("/client/drivingLicense/03-check")
	@ApiOperation(value = "Check Uploaded Encrypted Driving License Number In Database", notes = "This method checks if an uploaded encrypted driving license number is stored in database and returns an encrypted .ct file result. The file result is decrypted with 04-decryptCheckedResult. Note that: the requestID number is used in this method generated from the 02-upload method", tags = {
			"Driving License - Analysis", })
	public @ResponseBody ResponseEntity<byte[]> checkLicense(
			@ApiParam(name = "partnerID", value = "", example = "", required = true) @RequestParam("partnerID") String partnerID,
			@ApiParam(name = "requestID", value = "", example = "", required = true) @RequestParam("requestID") String requestID);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/drivingLicense/04-decryptCheckedResult")
	@ApiOperation(value = "Decrypted Checked Result File", notes = "This method decrypts a result file from 02-checkByFile method", tags = {
			"Driving License - Analysis", })
	public ResponseEntity<String> decryptCheckedResult(
			@ApiParam(name = "file", value = "", example = "", required = true) @RequestParam("file") MultipartFile file);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/drivingLicense/04-decryptCheckedResults")
	@ApiOperation(value = "Decrypted Checked Result File", notes = "This method decrypts results", tags = {
			"Driving License - Analysis", })
	public ResponseEntity<String> decryptCheckedResults(
			@ApiParam(name = "file", value = "", example = "", required = true) @RequestParam("file") MultipartFile file);

	@ApiOperation(value = "Get All Driving License In Database Without Showing Number", nickname = "getAllDrivingLicenses", notes = "Get All Driving License Encrypted Numbers", response = String.class, authorizations = {}, tags = {
			"Driving License - CRUD", })
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = List.class),
			@ApiResponse(code = 400, message = "Bad request", response = Description.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = Description.class),
			@ApiResponse(code = 404, message = "Not found", response = Description.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = Description.class) })
	@GetMapping("/client/drivingLicenses")
	ResponseEntity<List<DrivingLicense>> getAllDrivingLicenses(
			@ApiParam(name = "partnerID", value = "", example = "", required = true) @RequestParam("partnerID") String partnerID);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/drivingLicense")
	@ApiOperation(value = "Create Driving License Number", notes = "This method creates a driving license number", tags = {
			"Driving License - CRUD", })
	public ResponseEntity<Description> createDrivingLicense(
			@ApiParam(name = "drivingLicenseNo", value = "Any Character", example = "") @RequestParam(name = "drivingLicenseNo", required = true) String drivingLicenseNo,
			@ApiParam(name = "partnerID", value = "", example = "") @RequestParam(name = "partnerID", required = true) String partnerID,
			@ApiParam(name = "contractID", value = "", example = "") @RequestParam(name = "contractID", required = true) String contractID,
			@ApiParam(name = "status", value = "0,1,2, etc.", example = "") @RequestParam(name = "status", required = false) Integer status,
			@ApiParam(name = "description", value = "good, banned, etc.", example = "good") @RequestParam(name = "description", required = false) String description);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PutMapping("/client/drivingLicense")
	@ApiOperation(value = "Update Driving License Number", notes = "This method modifies a driving license number", tags = {
			"Driving License - CRUD", })
	public ResponseEntity<Description> updateDrivingLicense(
			@ApiParam(name = "drivingLicenseUpdate", value = "", example = "", required = true) @RequestBody DrivingLicenseUpdate drivingLicenseUpdate);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@DeleteMapping("/client/drivingLicense")
	@ApiOperation(value = "Delete Driving License Number", notes = "This method deletes a driving license number", tags = {
			"Driving License - CRUD", })
	public ResponseEntity<Description> deleteDrivingLicense(
			@ApiParam(name = "id", value = "", example = "", required = true) @RequestParam(name = "id", required = true) Integer id,
			@ApiParam(name = "partnerId", value = "", example = "", required = true) @RequestParam(name = "partnerId", required = true) String partnerId);

	@ApiOperation(value = "Download Encrpted Driving License Number File (.ct)", notes = "This method download an encrpted driving license number file", nickname = "downloadFile", response = ResponseEntity.class, authorizations = {}, tags = {
			"Driving License - Analysis", })
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response"),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/drivingLicense/download")
	public ResponseEntity<byte[]> downloadLicense(
			@ApiParam(name = "Id", value = "", example = "", required = true) @RequestParam(name = "Id") Integer Id,
			@ApiParam(name = "partnerID", value = "", example = "", required = true) @RequestParam("partnerID") String partnerID);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/drivingLicense/decrypt")
	@ApiOperation(value = "Decrypted Driving License File", notes = "This method decrypts a driving license number file", tags = {
			"Driving License - Analysis", })
	public ResponseEntity<String> decryptLicense(
			@ApiParam(name = "file", value = "", example = "", required = true) @RequestParam("file") MultipartFile file);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/drivingLicense/05-checkByNo-Auto")
	@ApiOperation(value = "Check An Encrypted Driving License Number In Database", notes = "This method checks if an uploaded encrypted driving license number is stored in database and returns an result", tags = {
			"Driving License - Analysis", })
	public ResponseEntity<String> checkDrivingLicenseByNoAuto(
			@ApiParam(name = "number", value = "Any Character", example = "", required = true) @RequestParam("number") String number,
			@ApiParam(name = "partnerID", value = "", example = "", required = true) @RequestParam("partnerID") String partnerID);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/test/drivingLicense")
	@ApiOperation(value = "Create Driving License Numbers", notes = "This method creates automatically driving license numbers", tags = {
			"Driving License - Testing", })
	public ResponseEntity<ArrayList<Integer>> createDrivingLicenseData(
			@ApiParam(name = "drivingLicenseNo", value = "Any Character", example = "") @RequestParam(name = "drivingLicenseNo", required = true) String drivingLicenseNo,
			@ApiParam(name = "partnerID", value = "", example = "") @RequestParam(name = "partnerID", required = true) String partnerID,
			@ApiParam(name = "contractID", value = "", example = "") @RequestParam(name = "contractID", required = true) String contractID,
			@ApiParam(name = "status", value = "0,1,2, etc.", example = "") @RequestParam(name = "status", required = false) Integer status,
			@ApiParam(name = "description", value = "good, banned, etc.", example = "good") @RequestParam(name = "description", required = false) String description);

	// For Front-End Demo

	// Authentication/Login - Begin
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@GetMapping("/client/login")
	@ApiOperation(value = "Login", notes = "Login", tags = { "Login", })
	public ResponseEntity<Description> servicelogin(
			@ApiParam(name = "partnerLoginURL", value = "URL", example = "") @RequestParam(name = "partnerLoginURL", required = true) String partnerLoginURL,
			@ApiParam(name = "userName", value = "", example = "") @RequestParam(name = "userName", required = true) String userName,
			@ApiParam(name = "pw", value = "", example = "") @RequestParam(name = "pw", required = true) String pw);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@GetMapping("/client/proxy")
	@ApiOperation(value = "Proxy", notes = "Proxy", tags = { "Proxy", })
	public ResponseEntity<Object> proxyGet(
			@ApiParam(name = "URL", value = "URL", example = "") @RequestParam(name = "URL", required = true) String URL,
			@ApiParam(name = "cookieSession", value = "cookieSession", example = "") @RequestParam(name = "cookieSession", required = true) String cookieSession);
	// Authentication/Login - End

	// Threshold - Compare - Begin
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/threshold/thresholdEncrypt")
	@ApiOperation(value = "", notes = "", tags = { "Threshold - Compare", })
	public ResponseEntity<String> thresholdEncrypt(
//			@ApiParam(name = "FHEModel", value = "Any Character", example = "seal", required = true) @RequestParam("FHEModel") String FHEModel,
			@ApiParam(name = "contractId", value = "Any Character", example = "2", required = true) @RequestParam("contractId") String contractId,
			@ApiParam(name = "partnerId", value = "Any Character", example = "cea", required = true) @RequestParam("partnerId") String partnerId,
			@ApiParam(name = "requestId", value = "Any Character", example = "202112151043", required = true) @RequestParam("requestId") String requestId,
//			@ApiParam(name = "isWithPubKey", value = "boolean", example = "false", required = false) @RequestParam("isWithPubKey") Boolean isWithPubKey,
			@RequestBody ObjectValue objectValue);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/threshold/sendRequestToFactory")
	@ApiOperation(value = "", notes = "", tags = { "Threshold - Compare", })
	public ResponseEntity<String> sendRequestToFactory(
//			@ApiParam(name = "category", value = "Any Character", example = "dataTimeStamp", required = true) @RequestParam("category") String category,
//			@ApiParam(name = "title", value = "Any Character", example = "", required = true) @RequestParam("title") String title,
			@ApiParam(name = "contractId", value = "Any Character", example = "", required = true) @RequestParam("contractId") String contractId,
//			@ApiParam(name = "description", value = "Any Character", example = "", required = true) @RequestParam("description") String description,
			@ApiParam(name = "partnerId", value = "Any Character", example = "", required = true) @RequestParam("partnerId") String partnerId,
			@ApiParam(name = "file", value = "", example = "", required = true) @RequestParam("file") MultipartFile file);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@GetMapping("/client/threshold/getResult")
	@ApiOperation(value = "", notes = "", tags = { "Threshold - Compare", })
	public ResponseEntity<String> getResult(
			@ApiParam(name = "contractId", value = "Any Character", example = "", required = true) @RequestParam("contractId") String contractId,
			@ApiParam(name = "partnerId", value = "Any Character", example = "", required = true) @RequestParam("partnerId") String partnerId,
			@ApiParam(name = "analysisReferenceId", value = "Any Character", example = "", required = true) @RequestParam("analysisReferenceId") String analysisReferenceId);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/threshold/decryptData")
	@ApiOperation(value = "", notes = "", tags = { "Threshold - Compare", })
	public ResponseEntity<String> decryptData(
			@ApiParam(name = "contractId", value = "Any Character", example = "", required = true) @RequestParam("contractId") String contractId,
			@ApiParam(name = "partnerId", value = "Any Character", example = "", required = true) @RequestParam("partnerId") String partnerId,
			@ApiParam(name = "requestId", value = "Any Character", example = "", required = true) @RequestParam("requestId") String requestId,
			@ApiParam(name = "file", value = "", example = "", required = true) @RequestParam("file") MultipartFile file);
	// Threshold - Compare - End

	// Driving License - Checking - Begin
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/encrypt")
	@ApiOperation(value = "", notes = "", tags = { "New", })
	public ResponseEntity<String> encryptPatternSearch(
//			@ApiParam(name = "FHEModel", value = "Any Character", example = "seal", required = true) @RequestParam("FHEModel") String FHEModel,
			@ApiParam(name = "contractId", value = "Any Character", example = "2", required = true) @RequestParam("contractId") String contractId,
			@ApiParam(name = "partnerId", value = "Any Character", example = "cea", required = true) @RequestParam("partnerId") String partnerId,
			@ApiParam(name = "requestId", value = "Any Character", example = "202112151043", required = true) @RequestParam("requestId") String requestId,
//			@ApiParam(name = "isWithPubKey", value = "boolean", example = "false", required = false) @RequestParam("isWithPubKey") Boolean isWithPubKey,
//			@ApiParam(name = "coreFunctionId", value = "Any Character", example = "ecorridorcnr", required = true) @RequestParam("coreFunctionId") String coreFunctionId,
			@RequestBody ObjectValue objectValue);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/sendRequestToFactory")
	@ApiOperation(value = "", notes = "", tags = { "New", })
	public ResponseEntity<String> sendRequestToFactoryPatternSearch(
//			@ApiParam(name = "category", value = "Any Character", example = "dataTimeStamp", required = true) @RequestParam("category") String category,
//			@ApiParam(name = "title", value = "Any Character", example = "", required = true) @RequestParam("title") String title,
			@ApiParam(name = "contractId", value = "Any Character", example = "", required = true) @RequestParam("contractId") String contractId,
//			@ApiParam(name = "description", value = "Any Character", example = "", required = true) @RequestParam("description") String description,
			@ApiParam(name = "data-reference-contract", value = "Any Character", example = "", required = true) @RequestParam("data-reference-contract") String dataReferenceContract,
			@ApiParam(name = "partnerId", value = "Any Character", example = "", required = true) @RequestParam("partnerId") String partnerId,
			@ApiParam(name = "file", value = "", example = "", required = true) @RequestParam("file") MultipartFile file);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@GetMapping("/client/getResult")
	@ApiOperation(value = "", notes = "", tags = { "New", })
	public ResponseEntity<String> getResultPatternSearch(
			@ApiParam(name = "contractId", value = "Any Character", example = "", required = true) @RequestParam("contractId") String contractId,
			@ApiParam(name = "partnerId", value = "Any Character", example = "", required = true) @RequestParam("partnerId") String partnerId,
			@ApiParam(name = "analysisReferenceId", value = "Any Character", example = "", required = true) @RequestParam("analysisReferenceId") String analysisReferenceId);

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/client/decrypt")
	@ApiOperation(value = "", notes = "", tags = { "New", })
	public ResponseEntity<String> decryptPatternSearch(
			@ApiParam(name = "contractId", value = "Any Character", example = "", required = true) @RequestParam("contractId") String contractId,
			@ApiParam(name = "partnerId", value = "Any Character", example = "", required = true) @RequestParam("partnerId") String partnerId,
			@ApiParam(name = "requestId", value = "Any Character", example = "", required = true) @RequestParam("requestId") String requestId,
//			@ApiParam(name = "coreFunctionId", value = "Any Character", example = "", required = true) @RequestParam("coreFunctionId") String coreFunctionId,
			@ApiParam(name = "file", value = "", example = "", required = true) @RequestParam("file") MultipartFile file);

//	@ApiOperation(value = "Get Database Files", notes = "Get Database Files", nickname = "", response = String.class, authorizations = {}, tags = {
//			"New", })
//	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = List.class),
//			@ApiResponse(code = 400, message = "Bad request", response = Description.class),
//			@ApiResponse(code = 401, message = "Unauthorized", response = Description.class),
//			@ApiResponse(code = 404, message = "Not found", response = Description.class),
//			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = Description.class) })
//	@RequestMapping(value = "/client/getDatabase", produces = { "application/json" }, method = RequestMethod.GET)
//	ResponseEntity<List<String>> getDatabase(
//			@ApiParam(name = "id", value = "", example = "", required = true) @RequestParam(value = "id") Integer id);

	// Driving License - Checking - End

	// Users
	@ApiOperation(value = "Get All Users", notes = "Get All Users", nickname = "getAllUsers", response = String.class, authorizations = {}, tags = {
			"User", })
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = List.class),
			@ApiResponse(code = 400, message = "Bad request", response = Description.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = Description.class),
			@ApiResponse(code = 404, message = "Not found", response = Description.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = Description.class) })
	@RequestMapping(value = "/users", produces = { "application/json" }, method = RequestMethod.GET)
	ResponseEntity<List<User>> getUsers();
	
	@ApiOperation(value = "Get User by ID", notes = "Get User by ID", nickname = "GetUserById", response = String.class, authorizations = {}, tags = {
			"User", })
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = List.class),
			@ApiResponse(code = 400, message = "Bad request", response = Description.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = Description.class),
			@ApiResponse(code = 404, message = "Not found", response = Description.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = Description.class) })
	@RequestMapping(value = "/user", produces = { "application/json" }, method = RequestMethod.GET)
	ResponseEntity<User> getUserById(
			@ApiParam(name = "id", value = "", example = "", required = true) @RequestParam(value = "id") Integer id);

	@ApiOperation(value = "Get All Basic Users", notes = "Get All Basic Users", nickname = "getBasicAllUsers", response = String.class, authorizations = {}, tags = {
			"User", })
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = List.class),
			@ApiResponse(code = 400, message = "Bad request", response = Description.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = Description.class),
			@ApiResponse(code = 404, message = "Not found", response = Description.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = Description.class) })
	@RequestMapping(value = "/basicusers", produces = { "application/json" }, method = RequestMethod.GET)
	ResponseEntity<List<BasicUser>> getBasicUsers();

	@ApiOperation(value = "Create User", notes = "This method creates a user", nickname = "createUser", response = User.class, authorizations = {}, tags = {
			"User", })
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/user")
	public ResponseEntity<Description> createOrUpdateUser(@RequestBody User user);

	@ApiOperation(value = "Delete User", notes = "This method deletes user", nickname = "deleteUser", response = String.class, authorizations = {}, tags = {
			"User", })
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@DeleteMapping("/user")
	public ResponseEntity<Description> deleteUser(
			@ApiParam(name = "id", value = "", example = "", required = true) @RequestParam(value = "id") Integer id);

//	@ApiOperation(value = "Update Driving License Number", notes = "This method modifies a driving license number", nickname = "hello", response = Data.class, authorizations = {}, tags = {
//			"User", })
//	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
//			@ApiResponse(code = 400, message = "Bad request", response = String.class),
//			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
//			@ApiResponse(code = 404, message = "Not found", response = String.class),
//			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
//	@PutMapping("/user")
//	public ResponseEntity<Description> updateData(
//			@ApiParam(name = "Id", value = "", example = "", required = true) @RequestParam(name = "Id") Integer Id,
//			@RequestBody User user
//			);

	@ApiOperation(value = "Authenticate User", notes = "This method authenticate a user", nickname = "authenticateUser", response = User.class, authorizations = {}, tags = {
			"User", })
	@ApiResponses(value = { @ApiResponse(code = 200, message = "Server response", response = String.class),
			@ApiResponse(code = 400, message = "Bad request", response = String.class),
			@ApiResponse(code = 401, message = "Unauthorized", response = String.class),
			@ApiResponse(code = 404, message = "Not found", response = String.class),
			@ApiResponse(code = 500, message = "Error for HTTPS call trustAnchors", response = String.class) })
	@PostMapping("/user/authenticate")
	public ResponseEntity<User> authenticateUser(@RequestBody User user);

	// User - End

}
