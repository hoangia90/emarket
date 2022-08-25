import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductRelatedInformation } from '../product-related-information.model';
import { ProductRelatedInformationService } from '../product-related-information.service';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-decrypt-data',
  templateUrl: './decrypt-data.component.html',
  styleUrls: ['./decrypt-data.component.css']
})
export class DecryptDataComponent implements OnInit {
  // @ViewChild('relatedInfoForm')
  // relatedInfoForm!: NgForm;

  file!: File;
  fileName = '';
  formData = new FormData();

  status: string = '';
  value: string = '';


  // constructor(
  //   private http: HttpClient,
  // ) { }

  // ngOnInit(): void {
  // }

  // onFileSelected(event: any) {

  //   this.file = event.target.files[0];

  //   if (this.file) {

  //     this.fileName = this.file.name;

  //     this.formData.append("file", this.file);

  //   }
  // }

  // onSubmit(form: NgForm) {
  //   const value = form.value;
  //   console.log(value, value.length);

  //   const url = '/api1/openapi/v1/client/threshold/decryptData?'
  //     + '?' +
  //     '&contractId=' + value['contractId'] +
  //     '&partnerId=' + value['partnerId'] +
  //     '&requestId=' + value['requestId'];


  //   const upload = this.http.post(url, this.formData, { responseType: 'text', observe: 'response' });

  //   return upload.subscribe(response => {
  //     // console.log(response.status);
  //     if (response.status === 200) {
  //       this.status = "Decrypted sucessfully!";
  //       if (response.body) {
  //         this.value = response.body;
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

  decryptAndDownloadwFile(pid: string, paramsInfo: ProductRelatedInformation[], file: FormData) {
    switch (pid) {
      case ("1"): {
        this.thresholdDecrypt(paramsInfo, file);
        break;
      }
      case ("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d"): {
        this.thresholdDecrypt(paramsInfo, file);
        break;
      }
      case ("2"): {
        //statements; 
        this.patternSearchDecrypt(paramsInfo, file);
        break;
      }
      case ("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c"): {
        //statements; 
        this.patternSearchDecrypt(paramsInfo, file);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  thresholdDecrypt(paramsInfo: ProductRelatedInformation[], formData: FormData) {

    // const url = '/api1/openapi/v1/client/threshold/thresholdEncrypt' + this.constructParams(paramsInfo);

    // // let strObj = this.constructBody(bodyInfo);

    // // const body = JSON.parse(strObj)

    // // console.log(body);

    // let httpHeaders = new HttpHeaders()
    //   .set('Accept', "application/json")
    //   .set('Content-Type', "application/json")

    // return this.http.post<Blob>(
    //   url,
    //   file,
    //   { headers: httpHeaders, responseType: 'blob' as 'json' }
    // )
    //   .subscribe(blob => {
    //     // const a = document.createElement('a')
    //     // const objectUrl = window.URL.createObjectURL(blob)
    //     // a.href = objectUrl
    //     // a.download = 'archive.json';
    //     // a.click();
    //     // URL.revokeObjectURL(objectUrl);
    //     saveAs(blob, 'archive.json');
    //   }

    //     // // {
    //     //   this.downloadFile(data),
    //     //         //console.log(data),
    //     //         //  error => console.log('Error downloading the file.'),
    //     //         //  () => console.info('OK');
    //     // // }
    //   );

    const url = '/api1/openapi/v1/client/threshold/decryptData' + this.productRelatedInfoService.constructParams(paramsInfo);
    // const value = form.value;
    // console.log(value, value.length);

    // const url = '/api1/openapi/v1/client/threshold/decryptData?'
    // + '?' +
    // '&contractId=' + value['contractId'] +
    // '&partnerId=' + value['partnerId'] +
    // '&requestId=' + value['requestId'];

    const upload = this.http.post(url, formData, { responseType: 'text', observe: 'response' });

    return upload.subscribe(response => {
      // console.log(response.status);
      if (response.status === 200) {
        this.status = "Decrypted sucessfully!";
        if (response.body) {
          this.value = response.body;
          // console.log(response.body);

        }
      } else {
        this.status = "Decrypt failed!";
      }
      // if (response.body) {
      //   this.fileName = response.body?.toString();
      // }
      // console.log(response.body?.toString());
      // this.fileName = response.ok;
    }
    );

  }

  patternSearchDecrypt(paramsInfo: ProductRelatedInformation[], formData: FormData) {
    const url = '/api1/openapi/v1/client/decrypt' + this.productRelatedInfoService.constructParams(paramsInfo);
    const upload = this.http.post(url, formData, { responseType: 'text', observe: 'response' });
    return upload.subscribe(response => {
      // console.log(response.status);
      if (response.status === 200) {
        this.status = "Decrypted sucessfully!";
        if (response.body) {
          this.value = response.body;
          // console.log(response.body);
        }
      } else {
        this.status = "Decrypt failed!";
      }
    }
    );
  }


  @Input()
  serviceId!: string;
  @Input()
  productId!: string;
  @ViewChild('relatedInfoForm')
  relatedInfoForm!: NgForm;

  info: ProductRelatedInformation[] = [];

  paramsInfo: ProductRelatedInformation[] = [];
  // bodyInfo: ProductRelatedInformation[] = [];

  isSubmitted: boolean = false;

  partnerId: string = '';
  contractId: string = '';
  requestId: string = '';
  currentUser: string = '';


  constructor(private slService: ShoppingListService, private productRelatedInfoService: ProductRelatedInformationService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.info = this.getProductRelatedInfo();
    this.paramsInfo = this.productRelatedInfoService.getInfoParams(this.info);
    // this.bodyInfo = this.productRelatedInfoService.getInfoBody(this.info);

    if (localStorage.getItem("server") !== null) {
      this.currentUser = JSON.parse(localStorage.getItem('server') || '').name;
      // console.log("Curent User!!!!!", this.currentUser);
      this.partnerId = JSON.parse(localStorage.getItem('server') || '').partnerId;
      this.contractId = JSON.parse(localStorage.getItem('server') || '').contractId;
      this.requestId = JSON.parse(localStorage.getItem('server') || '').requestId;
    }

  }

  // getProductRelatedInfo(id: string) {
  getProductRelatedInfo() {
    let info: ProductRelatedInformation[] = [];
    for (let index = 0; index < this.productRelatedInfoService.getDecryptRelatedValues().length; index++) {
      let element = this.productRelatedInfoService.getDecryptRelatedValues()[index];
      if (element.pid === this.productId) {
        info.push(element);
      }
    }
    return info;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value, value.length);
    console.log(this.info, this.info.length);
    console.log(this.file.name);


    for (let index = 0; index < this.info.length; index++) {
      this.info[index].value = value[index].toString();
    }

    this.slService.addServiceProductRelatedInfo(this.serviceId, this.info);

    // this.productRelatedInfoService.encryptAndDownload(this.productId, this.serviceId);

    // this.productRelatedInfoService.encryptAndDownload(this.productId, this.paramsInfo, this.bodyInfo);
    this.decryptAndDownloadwFile(this.productId, this.paramsInfo, this.formData);

    this.isSubmitted = true;
    // form.reset();



  }

  onFileSelected(event: any) {

    this.file = event.target.files[0];

    if (this.file) {

      this.fileName = this.file.name;

      this.formData.append("file", this.file);

    }
  }

}
