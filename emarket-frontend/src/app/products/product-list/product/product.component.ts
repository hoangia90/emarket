// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddToShoppingCartDialogAlertComponent } from '../../add-to-shopping-cart-dialog-alert/add-to-shopping-cart-dialog-alert.component';
import { AddToShoppingCartDialogComponent } from '../../add-to-shopping-cart-dialog/add-to-shopping-cart-dialog.component';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input()
  product!: Product;
  @Input()
  index!: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  onEditProduct() {
    this.router.navigate([this.index, 'edit'], { relativeTo: this.route });
  }

  onDeleteProduct() {
    this.productService.deleteProduct(this.index);
    // this.router.navigate(['/products']);
  }

  onAddToShoppingCart() {
    // this.productService.addServideToCart(this.product);
    this.productService.addServideToCartwQty(this.product, 1)
    // this.router.navigate(['/shopping-list'], { relativeTo: this.route });
  }

}
