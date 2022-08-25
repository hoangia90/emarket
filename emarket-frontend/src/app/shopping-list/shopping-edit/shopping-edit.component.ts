import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Service } from '../service.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  //shopping list
  // @ViewChild('f')
  // slForm!: NgForm;
  // subscription!: Subscription;
  // editMode = false;
  // editedItemIndex!: number;
  // editedItem!: Category;

  //cart
  @ViewChild('cartF')
  cartForm!: NgForm;
  cartSubscription!: Subscription;
  cartEditMode = false;
  cartEditedItemIndex!: number;
  cartEditedItem!: Service;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    //shopping list
    // this.subscription = this.slService.startedEditing.subscribe(
    //   (index: number) => {
    //     this.editedItemIndex = index;
    //     this.editMode = true;
    //     this.editedItem = this.slService.getCategory(index);
    //     this.slForm.setValue({
    //       name: this.editedItem.name,
    //       id: this.editedItem.id
    //     });
    //   }
    // );

    //cart
    this.cartSubscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.cartEditedItemIndex = index;
        this.cartEditMode = true;
        this.cartEditedItem = this.slService.getServiceCart()[index];
        this.cartForm.setValue({
          serviceId: this.cartEditedItem.id,
          productId: this.cartEditedItem.productId,
          productName: this.cartEditedItem.productName,
          // productDescription: this.cartEditedItem.productDescription,
          unitPrice: this.cartEditedItem.unitPrice,
          // productUrl: this.cartEditedItem.productUrl,
          // inputAddress: this.cartEditedItem.inputAddress,
          quantity: this.cartEditedItem.quantity,
          database: this.cartEditedItem.database,
          shippingMode: this.cartEditedItem.shippingMode,
        });
      }
    );
  }

  ngOnDestroy(): void {
    //shopping list
    // this.subscription.unsubscribe();
    //cart
    this.cartSubscription.unsubscribe();
  }

  //shopping list
  // onSubmit(form: NgForm) {
  //   const value = form.value;
  //   const newCategory = new Category(value.name, value.id);
  //   // this.categoryAdded.emit(newCategory);
  //   if (this.editMode) {
  //     this.slService.updateCategory(this.editedItemIndex, newCategory);
  //   } else {
  //     this.slService.addCategory(newCategory);
  //   }
  //   this.editMode = false;
  //   form.reset();
  // }

  //shopping list
  // onClear() {
  //   this.slForm.reset();
  //   this.editMode = false;
  // }

  //shopping list
  // onDelete() {
  //   this.slService.deleteCategory(this.editedItemIndex);
  //   this.onClear();
  // }

  //cart
  onSubmit(form: NgForm) {
    const value = form.value;
    // const newService = new Service( value.serviceId, value.productId, value.productName, value.productDescription, value.productUrl, value.inputAddress, value.databaseAddress, value.shippingMode, value.unitPrice, []);
    const newService = new Service(value.serviceId, value.productId, value.productName, value.databaseAddress, value.shippingMode, value.unitPrice, value.quantity, []);
    // this.categoryAdded.emit(newCategory);
    if (this.cartEditMode) {
      // console.log(newService);
      this.slService.updateServiceCart(this.cartEditedItemIndex, newService);
      // console.log(newService);
      // console.log("alloha");
    } else {
      // this.slService.addServiceToCart(newService);
      this.slService.addServiceToCartAndMerge(newService);
      // console.log(newService.id);
    }
    this.cartEditMode = false;
    form.reset();
  }

  onDeleteCart() {
    this.slService.deleteServiceFromCart(this.cartEditedItemIndex);
    this.onClearCart();
  }

  onClearCart() {
    this.cartForm.reset();
    this.cartEditMode = false;
  }

}
