import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { saveAs } from 'file-saver';
import { ProductRelatedInformation } from '../product-related-information.model';
import { ProductRelatedInformationService } from '../product-related-information.service';
import { ShoppingListService } from '../shopping-list.service';
import { Database } from './database.model';

@Component({
  selector: 'app-send-data-to-cloud',
  templateUrl: './send-data-to-cloud.component.html',
  styleUrls: ['./send-data-to-cloud.component.css']
})

export class SendDataToCloudComponent implements OnInit {

  // @ViewChild('relatedInfoForm')
  // relatedInfoForm!: NgForm;

  file!: File;
  fileName = '';
  formData = new FormData();

  status: string = '';
  value: string = '';

  selectedDatabase!: string;

  databases: Database[] = [
    new Database("101", "2b6063e437656fc7d6671a5f92fb1a9883cbd895fb57e8d02ddd6c96c9e5eb7d", "476b167f8c201176ac697cec842a5a5063e95662531bdd82758d37e03c251aab"), 
    new Database("1010", "e07b146f8c32bb99648ae8700e045e12c8d8ef367ac1adaf3ac1ec02098e6e2a", "f70b3ad87e961f4f668ec14b219d2771c116321f941e63d2359a369c8cba5685"), 
    new Database("5000", "485fb29e449f7a228251715959492a8df00b54638dddae65abd6f152a84da07b", "cd2b5ad7146a6b80ac200736db22a63630125a4ff5b6859998dbc3a26d18ea7e"),

    // new Database("101", "476b167f8c201176ac697cec842a5a5063e95662531bdd82758d37e03c251aab", "2b6063e437656fc7d6671a5f92fb1a9883cbd895fb57e8d02ddd6c96c9e5eb7d"),
    // new Database("1010", "f70b3ad87e961f4f668ec14b219d2771c116321f941e63d2359a369c8cba5685", "e07b146f8c32bb99648ae8700e045e12c8d8ef367ac1adaf3ac1ec02098e6e2a"),
    // new Database("5000", "cd2b5ad7146a6b80ac200736db22a63630125a4ff5b6859998dbc3a26d18ea7e", "485fb29e449f7a228251715959492a8df00b54638dddae65abd6f152a84da07b"),
  ];

  // constructor(private http: HttpClient) { }

  // ngOnInit(): void {
  // }


  // https://api.bigpi.eu:8443/api/dmp-data-reference/openapi/v1/bigpi-data-reference/fhe-data/ecorridorcnr/3/details/f70b3ad87e961f4f668ec14b219d2771c116321f941e63d2359a369c8cba5685
  url = "https://api.bigpi.eu:8443/api/dmp-data-reference/openapi/v1/bigpi-data-reference/fhe-data/ecorridorcnr/3/details/";
  onDatabaseChanged(event: any) {
    // console.log('onCategoryChanged')
    // this.selectedDatabase = selectedDatabase;
    let databaseLink = this.databases.find(d => d.value === this.selectedDatabase)?.linkID;
    console.log(databaseLink);
    window.open(this.url + databaseLink, "_blank");
    // console.log(value)
  }

  onFileSelected(event: any) {

    this.file = event.target.files[0];

    if (this.file) {

      this.fileName = this.file.name;

      this.formData.append("file", this.file);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe();
    }
  }

  // onSubmit(form: NgForm) {
  //   const value = form.value;
  //   console.log(value, value.length);

  //   const url = '/api1/openapi/v1/client/threshold/sendRequestToFactory'
  //     + '?' +
  //     'category=' + value['category'] +
  //     '&contractId=' + value['contractId'] +
  //     '&description=' + value['description'] +
  //     '&partnerId=' + value['partnerId'] +
  //     '&title=' + value['title'];

  //   // let httpParams = new HttpParams();
  //   // httpParams.append("category", value['category']),
  //   // httpParams.append("contractId", value['contractId'])
  //   // httpParams.append("description", value['description'])
  //   // httpParams.append("partnerId", value['partnerId'])
  //   // httpParams.append("title", value['title'])

  //   console.log(url);

  //   const upload = this.http.post(url, this.formData, { responseType: 'text', observe: 'response'});

  //   return upload.subscribe(response => {
  //     console.log(response.status);
  //     if (response.status === 200)
  //     {
  //       this.status = "Uploaded sucessfully!"
  //     } else {
  //       this.status = "Upload failed!"
  //     }
  //     if (response.body) {
  //       this.fileName = response.body?.toString();
  //     }
  //     console.log(response.body?.toString());
  //     // this.fileName = response.ok;
  //   }
  //   );
  // }



  sendDataToCloud(pid: string, paramsInfo: ProductRelatedInformation[], file: FormData) {
    switch (pid) {
      case ("1"): {
        this.thresholdSendDataToCloud(paramsInfo, file);
        break;
      }
      case ("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d"): {
        this.thresholdSendDataToCloud(paramsInfo, file);
        break;
      }
      case ("2"): {
        //statements; 
        this.patternSearchSendDataToCloud(paramsInfo, file);
        break;
      }
      case ("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c"): {
        //statements; 
        this.patternSearchSendDataToCloud(paramsInfo, file);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  thresholdSendDataToCloud(paramsInfo: ProductRelatedInformation[], formData: FormData) {
    const url = '/api1/openapi/v1/client/threshold/sendRequestToFactory' + this.productRelatedInfoService.constructParams(paramsInfo);

    const upload = this.http.post(url, formData, { responseType: 'text', observe: 'response' });

    return upload.subscribe(response => {
      // console.log(response.status);
      if (response.status === 200) {
        this.status = "Decrypted sucessfully!";
        if (response.body) {
          this.value = response.body;
          // this.value =JSON.stringify(response.body);
          // this.value = JSON.parse(JSON.stringify(response.body)).value()
          // this.value = JSON.parse(response.body).value;
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

  patternSearchSendDataToCloud(paramsInfo: ProductRelatedInformation[], formData: FormData) {
    const url = '/api1/openapi/v1/client/sendRequestToFactory' + this.productRelatedInfoService.constructParams(paramsInfo);
    const upload = this.http.post(url, formData, { responseType: 'text', observe: 'response' });
    return upload.subscribe(response => {
      // console.log(response.status);
      if (response.status === 200) {
        this.status = "Decrypted sucessfully!";
        if (response.body) {
          this.value = JSON.stringify(response.body);
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
    console.log(this.info);
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
    for (let index = 0; index < this.productRelatedInfoService.getSendDataToCloudRelatedValues().length; index++) {
      let element = this.productRelatedInfoService.getSendDataToCloudRelatedValues()[index];
      if (element.pid === this.productId) {
        info.push(element);
      }
    }
    return info;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(form.value);

    // console.log(value, value.length);
    // console.log(this.info, this.info.length);
    // console.log(this.file.name);


    for (let index = 0; index < this.info.length; index++) {
      this.info[index].value = value[index].toString();
    }

    this.slService.addServiceProductRelatedInfo(this.serviceId, this.info);

    // this.productRelatedInfoService.encryptAndDownload(this.productId, this.serviceId);

    // this.productRelatedInfoService.encryptAndDownload(this.productId, this.paramsInfo, this.bodyInfo);
    this.sendDataToCloud(this.productId, this.paramsInfo, this.formData);

    this.isSubmitted = true;
    // form.reset();
  }

}
