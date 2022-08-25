import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { ProductRelatedInformation } from '../product-related-information.model';
import { ProductRelatedInformationService } from '../product-related-information.service';
import { Server } from 'src/app/servers/server.model';

@Component({
  selector: 'app-encrypt-data',
  templateUrl: './encrypt-data.component.html',
  styleUrls: ['./encrypt-data.component.css']
})
export class EncryptDataComponent implements OnInit {
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

  n = new Date();
  y = this.n.getFullYear();
  m = this.n.getMonth();
  d = this.n.getDate();
  h = this.n.getHours();
  mi = this.n.getMinutes();
  t: string = this.y + '' + this.m + '' + this.d + '' + this.h + '' + this.mi;

  currentUser: string = '';
  coefficient: number = 1;
  partnerId: string = '';
  contractId: string = '';
  requestId: string = '';
  server!: Server;


  constructor(private slService: ShoppingListService, private productRelatedInfoService: ProductRelatedInformationService) {

  }

  ngOnInit(): void {
    this.info = this.getProductRelatedInfo();
    this.paramsInfo = this.productRelatedInfoService.getInfoParams(this.info);
    this.bodyInfo = this.productRelatedInfoService.getInfoBody(this.info);

    if (localStorage.getItem("server") !== null) {
      this.server = JSON.parse(localStorage.getItem("server") || '');
      this.currentUser = JSON.parse(localStorage.getItem('server') || '').name;
      // console.log("Curent User!!!!!", this.currentUser);
      this.partnerId = JSON.parse(localStorage.getItem('server') || '').partnerId;
      this.contractId = JSON.parse(localStorage.getItem('server') || '').contractId;

      switch (this.currentUser) {
        case "Jubic":
          this.coefficient = 100;
          break;
        case "Heverett":
          this.coefficient = 1000000;
          break;
        default:
          break;
      }
    }
  }

  // getProductRelatedInfo(id: string) {
  getProductRelatedInfo() {
    let info: ProductRelatedInformation[] = [];
    for (let index = 0; index < this.productRelatedInfoService.getEncryptRelatedValues().length; index++) {
      let element = this.productRelatedInfoService.getEncryptRelatedValues()[index];
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

    this.productRelatedInfoService.encryptAndDownload(this.productId, this.paramsInfo, this.bodyInfo);

    this.isSubmitted = true;


    // localStorage.setItem('server.requestId', this.t)
    this.server.requestId = this.t;
    localStorage.setItem('server', JSON.stringify(this.server));

  }

}
