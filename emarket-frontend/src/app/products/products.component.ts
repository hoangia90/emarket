import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ProductService } from './product.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  currentRoute!: string;

  constructor(private router: Router, location: Location) {
    // this.currentRoute = this.router.url;
    // console.log('Location >>>> ',this.currentRoute);

    router.events.subscribe(val => {
      this.currentRoute = location.path();
      console.log('Location >>>> ', this.currentRoute);
    });
  }

  ngOnInit() {

  }
}
