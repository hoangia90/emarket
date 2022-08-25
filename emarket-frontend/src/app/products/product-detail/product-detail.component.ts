import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { reduceEachLeadingCommentRange } from 'typescript';
import { AddToShoppingCartDialogAlertComponent } from '../add-to-shopping-cart-dialog-alert/add-to-shopping-cart-dialog-alert.component';
import { AddToShoppingCartDialogComponent } from '../add-to-shopping-cart-dialog/add-to-shopping-cart-dialog.component';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  // @Input() 
  product!: Product;
  // @Input() 
  id!: number;

  qty: number = 1;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.product = this.productService.getProduct(this.id);
          console.log(this.product);
        }
      );
  }

  onAddToShoppingCart() {
    // if (this.product.status === "activated") {
    //   // this.productService.addServideToCart(this.product)
    //   this.productService.addServideToCartwQty(this.product, this.qty)
    //   const dialogRef = this.dialog.open(AddToShoppingCartDialogComponent, {
    //     data: {
    //       message: this.qty + ' ' + this.product.name + ' is added into your shopping cart !',
    //       buttonText: {
    //         cancel: 'Cancel'
    //       }
    //     },
    //   });
    // } else {
    //   const dialogRef = this.dialog.open(AddToShoppingCartDialogAlertComponent, {
    //     data: {
    //       message: 'Could not add this product, this product is ' + this.product.status + ' !',
    //       buttonText: {
    //         cancel: 'Cancel'
    //       }
    //     },
    //   });
    // }
    // this.productService.addServideToCart(this.product);
    this.productService.addServideToCartwQty(this.product, this.qty)
    // this.router.navigate(['/shopping-list'], { relativeTo: this.route });
  }

  onEditProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo:this.route});
  }

  onDeleteProduct() {
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/products']);
  }

  onDeleteService() {
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/products']);
  }

  // onAddToShoppingList() {
  //   this.productService.addCategoriesToShoppingList(this.product.categories);
  // }

}
