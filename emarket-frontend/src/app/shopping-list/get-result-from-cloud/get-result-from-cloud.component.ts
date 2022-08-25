import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { saveAs } from 'file-saver';
import { ProductRelatedInformation } from '../product-related-information.model';
import { ProductRelatedInformationService } from '../product-related-information.service';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-get-result-from-cloud',
  templateUrl: './get-result-from-cloud.component.html',
  styleUrls: ['./get-result-from-cloud.component.css']
})
export class GetResultFromCloudComponent implements OnInit {
  //   @ViewChild('relatedInfoForm')
  //   relatedInfoForm!: NgForm;

  //   file!: File;
  //   fileName = '';
  //   formData = new FormData();

  //   status: string = '';
  //   value: string = '';

  //   constructor(private http: HttpClient) { }

  //   ngOnInit(): void {
  //   }

  //   onSubmit(form: NgForm) {
  //     const value = form.value;
  //     console.log(value, value.length);

  //     const url = '/api1/openapi/v1/client/threshold/getResult'
  //       + '?' +
  //       '&analysisReferenceId=' + value['analysisReferenceId'] +
  //       '&contractId=' + value['contractId'] +
  //       '&partnerId=' + value['partnerId']
  //       ;

  //     console.log(url);

  //     const download = this.http.get(url);

  //     let httpHeaders = new HttpHeaders()
  //       .set('Accept', "application/json")
  //       .set('Content-Type', "application/json")

  //     return this.http.get<Blob>(
  //       url,
  //       { headers: httpHeaders, responseType: 'blob' as 'json' }
  //     )
  //       .subscribe(blob => {
  //         saveAs(blob, 'encrypted-result.json');
  //       }
  //       );
  //   }
  // }

  @Input()
  serviceId!: string;
  @Input()
  productId!: string;
  @ViewChild('relatedInfoForm')
  relatedInfoForm!: NgForm;

  info: ProductRelatedInformation[] = [];

  paramsInfo: ProductRelatedInformation[] = [];
  bodyInfo: ProductRelatedInformation[] = [];

  isSubmitted: boolean = false;

  partnerId: string = '';
  contractId: string = '';
  requestId: string = '';
  currentUser: string = '';


  constructor(private http: HttpClient, private slService: ShoppingListService, private productRelatedInfoService: ProductRelatedInformationService) { 
  }

  ngOnInit(): void {
    this.info = this.getProductRelatedInfo();
    this.paramsInfo = this.productRelatedInfoService.getInfoParams(this.info);
    this.bodyInfo = this.productRelatedInfoService.getInfoBody(this.info);

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
    for (let index = 0; index < this.productRelatedInfoService.getResultFromCloudRelatedValues().length; index++) {
      let element = this.productRelatedInfoService.getResultFromCloudRelatedValues()[index];
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

    for (let index = 0; index < this.info.length; index++) {
      this.info[index].value = value[index].toString();
    }

    this.slService.addServiceProductRelatedInfo(this.serviceId, this.info);

    // this.productRelatedInfoService.encryptAndDownload(this.productId, this.serviceId);

    this.getResultFromCloudAndDownload(this.productId, this.paramsInfo, this.bodyInfo);

    this.isSubmitted = true;
    // form.reset();

  }

  getResultFromCloudAndDownload(pid: string, paramsInfo: ProductRelatedInformation[], bodyInfo: ProductRelatedInformation[]) {
    switch (pid) {
      case ("1"): {
        this.thresholdGetResultFromCloud(paramsInfo, bodyInfo);
        break;
      }
      case ("a6a161cf6cc05c72c421b12f779209a8d8485bf79470edc6b838dbe6013e133d"): {
        this.thresholdGetResultFromCloud(paramsInfo, bodyInfo);
        break;
      }
      case ("2"): {
        //statements; 
        this.patternSearchGetResultFromCloud(paramsInfo, bodyInfo);
        break;
      }
      case ("f4196b6fee3243fe5d77669d417260639a7982ebcd6c0175d6026ae75dadb50c"): {
        //statements; 
        this.patternSearchGetResultFromCloud(paramsInfo, bodyInfo);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  thresholdGetResultFromCloud(paramsInfo: ProductRelatedInformation[], bodyInfo: ProductRelatedInformation[]) {

    const url = '/api1/openapi/v1/client/threshold/getResult' + this.productRelatedInfoService.constructParams(paramsInfo);

    let strObj = this.productRelatedInfoService.constructBody(bodyInfo);

    const body = JSON.parse(strObj)

    console.log(body);

    let httpHeaders = new HttpHeaders()
      .set('Accept', "application/json")
      .set('Content-Type', "application/json")

    return this.http.get<Blob>(
      url,
      { headers: httpHeaders, responseType: 'blob' as 'json' }
    )
      .subscribe(blob => {
        saveAs(blob, 'encrypted-result.json');
      }
      );
  }

  patternSearchGetResultFromCloud(paramsInfo: ProductRelatedInformation[], bodyInfo: ProductRelatedInformation[]) {

    const url = '/api1/openapi/v1/client/getResult' + this.productRelatedInfoService.constructParams(paramsInfo);

    let strObj = this.productRelatedInfoService.constructBody(bodyInfo);

    const body = JSON.parse(strObj)

    console.log(body);

    let httpHeaders = new HttpHeaders()
      .set('Accept', "application/json")
      .set('Content-Type', "application/json")

    return this.http.get<Blob>(
      url,
      { headers: httpHeaders, responseType: 'blob' as 'json' }
    )
      .subscribe(blob => {
        saveAs(blob, 'encrypted-result.json');
      }
      );
    }
}
