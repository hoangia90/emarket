import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthUsrService } from "../authUsr/authUsr.service";
import { ShoppingListService } from "./shopping-list.service";
import { ProductRelatedInformation } from "./product-related-information.model";

import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ProductRelatedInformationService {

  constructor(private http: HttpClient, private authUsr: AuthUsrService, private slService: ShoppingListService) {
  }

  // Hard code data
  encryptRelatedValues: ProductRelatedInformation[] = [
    // Threshold analysis
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'customerAssemblyDeviceID', 'Customer Assembly Device ID', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'value', 'Value', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'coefficient', 'Coefficient', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'dateTime', 'Date time', ''),
    // Black IP check
    new ProductRelatedInformation("e1ca0018080d29ed35cbd8f7c5e43960b1c9b9289064c048f6c7bdfd97ddbb42", 'body', 'contractid', 'Contract ID', ''),
    new ProductRelatedInformation("e1ca0018080d29ed35cbd8f7c5e43960b1c9b9289064c048f6c7bdfd97ddbb42", 'body', 'emailaddress', 'Email Address', ''),
    new ProductRelatedInformation("e1ca0018080d29ed35cbd8f7c5e43960b1c9b9289064c048f6c7bdfd97ddbb42", 'body', 'dateTime', 'Date Time', ''),
    // Driving license check
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'contractid', 'Contract ID', ''),
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'drivinglicensenumber', 'Driving License Number', ''),
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'dateTime', 'Date Time', ''),
    // Spam email check
    new ProductRelatedInformation("4e5759449683e7fa0888b1adc8b4bab60ecdeca6fcb18f6fb9a114a0b28d0e2a", 'body', 'contractid', 'Contract ID', ''),
    new ProductRelatedInformation("4e5759449683e7fa0888b1adc8b4bab60ecdeca6fcb18f6fb9a114a0b28d0e2a", 'body', 'emailaddress', 'Email Address', ''),
    new ProductRelatedInformation("4e5759449683e7fa0888b1adc8b4bab60ecdeca6fcb18f6fb9a114a0b28d0e2a", 'body', 'dateTime', 'Date Time', ''),

    // // Black IP check
    // new ProductRelatedInformation("0", 'body', 'contractid', 'Contract ID', ''),
    // new ProductRelatedInformation("0", 'body', 'ipaddress', 'IP Address', ''),
    // new ProductRelatedInformation("0", 'body', 'dateTime', 'Date Time', ''),

    // Threshold analysis
    new ProductRelatedInformation("1", 'param', 'partnerId', 'Partner Id', ''),
    new ProductRelatedInformation("1", 'param', 'contractId', 'Contract Id', ''),
    new ProductRelatedInformation("1", 'param', 'requestId', 'Request Id', ''),
    // new ProductRelatedInformation("1", 'param', 'FHEModel', 'FHE Model', ''),
    // new ProductRelatedInformation("1", 'param', 'isWithPubKey', 'Is With PubKey', ''),
    //
    // new ProductRelatedInformation("1", 'body', 'customerAssemblyDeviceID', 'Customer Assembly Device ID', 'DeviceID'),
    new ProductRelatedInformation("1", 'body', 'value', 'Value', ''),
    new ProductRelatedInformation("1", 'body', 'coefficient', 'Coefficient', ''),
    new ProductRelatedInformation("1", 'body', 'dateTime', 'Date Time', ''),

    // Driving license check
    new ProductRelatedInformation("2", 'param', 'partnerId', 'Partner Id', ''),
    new ProductRelatedInformation("2", 'param', 'contractId', 'Contract Id', ''),
    new ProductRelatedInformation("2", 'param', 'requestId', 'Request Id', ''),
    // new ProductRelatedInformation("2", 'param', 'FHEModel', 'FHE Model', ''),
    // new ProductRelatedInformation("2", 'param', 'isWithPubKey', 'Is With PubKey', ''),
    // new ProductRelatedInformation("2", 'param', 'coreFunctionId', 'Core Function Id', ''),
    //
    // new ProductRelatedInformation("2", 'body', 'customerAssemblyDeviceID', 'Customer Assembly Device ID', 'DeviceID'),
    new ProductRelatedInformation("2", 'body', 'value', 'Value', ''),
    new ProductRelatedInformation("2", 'body', 'coefficient', 'Coefficient', ''),
    new ProductRelatedInformation("2", 'body', 'dateTime', 'Date Time', ''),

    // // Spam email check
    // new ProductRelatedInformation("3", 'body', 'contractid', 'Contract ID', ''),
    // new ProductRelatedInformation("3", 'body', 'emailaddress', 'Email Address', ''),
    // new ProductRelatedInformation("3", 'body', 'dateTime', 'Date Time', ''),

    // // ????
    // new ProductRelatedInformation("4", 'body', 'contractid', 'Contract ID', ''),
    // new ProductRelatedInformation("4", 'body', 'value', 'Value', ''),
    // new ProductRelatedInformation("4", 'body', 'date time', 'Date Time', ''),
  ];

  decryptRelatedValues: ProductRelatedInformation[] = [
    // Threshold analysis
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'customerAssemblyDeviceID', 'Customer Assembly Device ID', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'value', 'Value', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'coefficient', 'Coefficient', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'dateTime', 'Date time', ''),
    
    // Driving license check
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'contractid', 'Contract ID', ''),
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'drivinglicensenumber', 'Driving License Number', ''),
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'dateTime', 'Date Time', ''),

    // Threshold analysis
    new ProductRelatedInformation("1", 'param', 'partnerId', 'Partner Id', ''),
    new ProductRelatedInformation("1", 'param', 'contractId', 'Contract Id', ''),
    new ProductRelatedInformation("1", 'param', 'requestId', 'Request Id', ''),

    // Driving license check
    new ProductRelatedInformation("2", 'param', 'partnerId', 'Partner Id', ''),
    new ProductRelatedInformation("2", 'param', 'contractId', 'Contract Id', ''),
    new ProductRelatedInformation("2", 'param', 'requestId', 'Request Id', ''),
    // new ProductRelatedInformation("2", 'param', 'coreFunctionId', 'Core Function Id', 'CEAS_PATTERN_SEARCH_V2'),
  ];

  sendDataToCloudRelatedValues: ProductRelatedInformation[] = [
    // Threshold analysis
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'customerAssemblyDeviceID', 'Customer Assembly Device ID', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'value', 'Value', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'coefficient', 'Coefficient', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'dateTime', 'Date time', ''),
    
    // Driving license check
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'contractid', 'Contract ID', ''),
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'drivinglicensenumber', 'Driving License Number', ''),
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'dateTime', 'Date Time', ''),

    // Threshold analysis
    new ProductRelatedInformation("1", 'param', 'partnerId', 'Partner Id', ''),
    new ProductRelatedInformation("1", 'param', 'contractId', 'Contract Id', ''),
    // new ProductRelatedInformation("1", 'param', 'category', 'Category', ''),
    // new ProductRelatedInformation("1", 'param', 'title', 'Title', ''),
    // new ProductRelatedInformation("1", 'param', 'description', 'Description', ''),

    // Driving license checks
    new ProductRelatedInformation("2", 'param', 'partnerId', 'Partner Id', ''),
    new ProductRelatedInformation("2", 'param', 'contractId', 'Contract Id', ''),
    // new ProductRelatedInformation("2", 'param', 'category', 'Category', ''),
    // new ProductRelatedInformation("2", 'param', 'title', 'Title', ''),
    // new ProductRelatedInformation("2", 'param', 'description', 'Description', ''),
    new ProductRelatedInformation("2", 'param', 'data-reference-contract', 'Data Reference Contract', ''),
  ];

  pullResultFromCloudRelatedValues: ProductRelatedInformation[] = [
    // Threshold analysis
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'customerAssemblyDeviceID', 'Customer Assembly Device ID', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'value', 'Value', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'coefficient', 'Coefficient', ''),
    new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'dateTime', 'Date time', ''),
    
    // Driving license check
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'contractid', 'Contract ID', ''),
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'drivinglicensenumber', 'Driving License Number', ''),
    new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'dateTime', 'Date Time', ''),

    // Threshold analysis
    new ProductRelatedInformation("1", 'param', 'partnerId', 'Partner Id', ''),
    new ProductRelatedInformation("1", 'param', 'contractId', 'Contract Id', ''),
    new ProductRelatedInformation("1", 'param', 'analysisReferenceId', 'Analysis Reference Id', ''),

    // Driving license checks
    new ProductRelatedInformation("2", 'param', 'partnerId', 'Partner Id', ''),
    new ProductRelatedInformation("2", 'param', 'contractId', 'Contract Id', ''),
    new ProductRelatedInformation("2", 'param', 'analysisReferenceId', 'Analysis Reference Id', ''),
  ];


  // productRelatedApis: ProductRelatedInformation[] = [
  //   // Threshold analysis
  //   new ProductRelatedInformation("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d", 'body', 'threshold', 'encrypt', ''),
  //   new ProductRelatedInformation("e1ca0018080d29ed35cbd8f7c5e43960b1c9b9289064c048f6c7bdfd97ddbb42", 'body', 'BlackIP', 'Contract ID', ''),
  //   new ProductRelatedInformation("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c", 'body', 'DrivingLicense', 'Contract ID', ''),
  //   new ProductRelatedInformation("4e5759449683e7fa0888b1adc8b4bab60ecdeca6fcb18f6fb9a114a0b28d0e2a", 'body', 'SpamEmail', 'Contract ID', ''),
  // ];

  getEncryptRelatedValues() {
    return this.encryptRelatedValues;
  }

  getDecryptRelatedValues() {
    return this.decryptRelatedValues;
  }

  getSendDataToCloudRelatedValues() {
    return this.sendDataToCloudRelatedValues;
  }

  getResultFromCloudRelatedValues() {
    return this.pullResultFromCloudRelatedValues;
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  

  encryptAndDownload(pid: string, paramsInfo: ProductRelatedInformation[], bodyInfo: ProductRelatedInformation[]) {
    switch (pid) {
      case ("1"): {
        this.thresholdEncrypt(paramsInfo, bodyInfo);
        break;
      }
      case ("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d"): {
        this.thresholdEncrypt(paramsInfo, bodyInfo);
        break;
      }
      case ("2"): {
        //statements; 
        this.patternSearchEncrypt(paramsInfo, bodyInfo);
        break;
      }
      case ("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c"): {
        //statements; 
        this.patternSearchEncrypt(paramsInfo, bodyInfo);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  // decryptAndDownloadwFile(pid: string, paramsInfo: ProductRelatedInformation[], file: FormData) {
  //   switch (pid) {
  //     case ("1"): {
  //       this.thresholdDecrypt(paramsInfo, file);
  //       break;
  //     }
  //     case ("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d"): {
  //       this.thresholdDecrypt(paramsInfo, file);
  //       break;
  //     }
  //     case ("2"): {
  //       //statements; 
  //       // this.patternSearchEncrypt(paramsInfo, file);
  //       break;
  //     }
  //     case ("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c"): {
  //       //statements; 
  //       // this.patternSearchEncrypt(paramsInfo, file);
  //       break;
  //     }
  //     default: {
  //       //statements; 
  //       break;
  //     }
  //   }
  // }

  getInfoParams(info: ProductRelatedInformation[]) {
    let params: ProductRelatedInformation[] = [];
    for (let index = 0; index < info.length; index++) {
      let element = info[index];
      if (element.type === "param") {
        params.push(element);
      }
    }
    return params;
  }

  getInfoBody(info: ProductRelatedInformation[]) {
    let body: ProductRelatedInformation[] = [];
    for (let index = 0; index < info.length; index++) {
      let element = info[index];
      if (element.type === "body") {
        body.push(element);
      }
    }
    return body;
  }

  constructParams(paramsInfo: ProductRelatedInformation[]) {
    let strParams = '?';
    for (let index = 0; index < paramsInfo.length; index++) {
      const element = paramsInfo[index];
      if (index < paramsInfo.length - 1) {
        strParams = strParams + element.key + '=' + element.value + '&'
      } else {
        strParams = strParams + element.key + '=' + element.value
      }
    }
    return strParams;
  }

  constructBody(bodyInfo: ProductRelatedInformation[]) {
    let strObj = '';
    // console.log(strObj);
    for (let index = 0; index < bodyInfo.length; index++) {
      const element = bodyInfo[index];
      if (index < bodyInfo.length - 1) {
        strObj = strObj + '"' + element.key + '": "' + element.value + '", '
      } else {
        strObj = strObj + '"' + element.key + '": "' + element.value + '"'
      }
    }
    strObj = '{' + strObj + '}';
    return strObj;
  }

  thresholdEncrypt(paramsInfo: ProductRelatedInformation[], bodyInfo: ProductRelatedInformation[]) {

    const url = '/api1/openapi/v1/client/threshold/thresholdEncrypt' + this.constructParams(paramsInfo);

    let strObj = this.constructBody(bodyInfo);

    const body = JSON.parse(strObj)

    console.log(body);

    let httpHeaders = new HttpHeaders()
      .set('Accept', "application/json")
      .set('Content-Type', "application/json")

    return this.http.post<Blob>(
      url,
      body,
      { headers: httpHeaders, responseType: 'blob' as 'json' }
    )
      .subscribe(blob => {
        // const a = document.createElement('a')
        // const objectUrl = window.URL.createObjectURL(blob)
        // a.href = objectUrl
        // a.download = 'archive.json';
        // a.click();
        // URL.revokeObjectURL(objectUrl);
        saveAs(blob, 'archive.json');
      }

        // // {
        //   this.downloadFile(data),
        //         //console.log(data),
        //         //  error => console.log('Error downloading the file.'),
        //         //  () => console.info('OK');
        // // }
      );
  }

  // status: string = '';
  // value: string = '';
  // thresholdDecrypt(paramsInfo: ProductRelatedInformation[], formData: FormData) {

  //   // const url = '/api1/openapi/v1/client/threshold/thresholdEncrypt' + this.constructParams(paramsInfo);

  //   // // let strObj = this.constructBody(bodyInfo);

  //   // // const body = JSON.parse(strObj)

  //   // // console.log(body);

  //   // let httpHeaders = new HttpHeaders()
  //   //   .set('Accept', "application/json")
  //   //   .set('Content-Type', "application/json")

  //   // return this.http.post<Blob>(
  //   //   url,
  //   //   file,
  //   //   { headers: httpHeaders, responseType: 'blob' as 'json' }
  //   // )
  //   //   .subscribe(blob => {
  //   //     // const a = document.createElement('a')
  //   //     // const objectUrl = window.URL.createObjectURL(blob)
  //   //     // a.href = objectUrl
  //   //     // a.download = 'archive.json';
  //   //     // a.click();
  //   //     // URL.revokeObjectURL(objectUrl);
  //   //     saveAs(blob, 'archive.json');
  //   //   }

  //   //     // // {
  //   //     //   this.downloadFile(data),
  //   //     //         //console.log(data),
  //   //     //         //  error => console.log('Error downloading the file.'),
  //   //     //         //  () => console.info('OK');
  //   //     // // }
  //   //   );

  //   const url = '/api1/openapi/v1/client/threshold/decryptData' + this.constructParams(paramsInfo);
  //     // const value = form.value;
  //   // console.log(value, value.length);

  //   // const url = '/api1/openapi/v1/client/threshold/decryptData?'
  //     // + '?' +
  //     // '&contractId=' + value['contractId'] +
  //     // '&partnerId=' + value['partnerId'] +
  //     // '&requestId=' + value['requestId'];

  //     const upload = this.http.post(url, formData, { responseType: 'text', observe: 'response' });

  //   return upload.subscribe(response => {
  //     // console.log(response.status);
  //     if (response.status === 200) {
  //       this.status = "Decrypted sucessfully!";
  //       if (response.body) {
  //         this.value = response.body;
  //         console.log(response.body);
          
  //       }
  //     } else {
  //       this.status = "Decrypt failed!";
  //     }
  //     // if (response.body) {
  //     //   this.fileName = response.body?.toString();
  //     // }
  //     // console.log(response.body?.toString());
  //     // this.fileName = response.ok;
  //   }
  //   );

  // }

  patternSearchEncrypt(paramsInfo: ProductRelatedInformation[], bodyInfo: ProductRelatedInformation[]) {

    const url = '/api1/openapi/v1/client/encrypt' + this.constructParams(paramsInfo);

    // http://localhost:9292/openapi/v1/client/DrivingLicense/encrypt?FHEModel=seal&contractId=3&coreFunctionId=CEAS_PATTERN_SEARCH_V2&isWithPubKey=false&partnerId=ecorridorcnr&requestId=01310436

    let strObj = this.constructBody(bodyInfo);

    const body = JSON.parse(strObj)

    console.log(body);

    let httpHeaders = new HttpHeaders()
      .set('Accept', "application/json")
      .set('Content-Type', "application/json")

    return this.http.post<Blob>(
      url,
      body,
      { headers: httpHeaders, responseType: 'blob' as 'json' }
    )
      .subscribe(blob => {
        // const a = document.createElement('a')
        // const objectUrl = window.URL.createObjectURL(blob)
        // a.href = objectUrl
        // a.download = 'archive.json';
        // a.click();
        // URL.revokeObjectURL(objectUrl);
        saveAs(blob, 'archive.json');
      }

        // // {
        //   this.downloadFile(data),
        //         //console.log(data),
        //         //  error => console.log('Error downloading the file.'),
        //         //  () => console.info('OK');
        // // }
      );

  }

  // downloadFile(data: Response) {
  //   const blob = new Blob([data], { type: 'text/csv' });
  //   const url= window.URL.createObjectURL(blob);
  //   window.open(url);
  // }

}
