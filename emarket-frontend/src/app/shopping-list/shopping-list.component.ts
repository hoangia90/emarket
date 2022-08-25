import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list/selection-list';
import { Subscription } from 'rxjs';
import { Service } from './service.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  isSet: boolean = false;

  firstFormGroup: FormGroup = this.formBuilder.group({
    // firstCtrl: ['', Validators.required],
    firstCtrl: [],
  });
  secondFormGroup: FormGroup = this.formBuilder.group({
    // secondCtrl: ['', Validators.required],
    secondCtrl: [],
  });
  thirdFormGroup: FormGroup = this.formBuilder.group({
    // secondCtrl: ['', Validators.required],
    thirdCtrl: [],
  });
  fourthFormGroup: FormGroup = this.formBuilder.group({
    // secondCtrl: ['', Validators.required],
    fourthCtrl: [],
  });
  fifthFormGroup: FormGroup = this.formBuilder.group({
    // secondCtrl: ['', Validators.required],
    fifthCtrl: [],
  });

  isEditable = false;
  // isEditable = true;

  // selectedDatabase!: string;

  // databases: string[] = ['Small (500MB)', 'Medium (1GB)', 'Large (10GB)', 'Unlimited'];
  // shippingModes: string[] = ['Immediate + 150(EUR)', '1 hrs +100(EUR)', '1 day +50(EUR)', 'Infinity -> Free'];
  // fileInputs: string[] = ['File Path 1', 'File Path 2', 'File Path 3', 'File Path 4'];

  // categories: Category[] = [];
  private igChangeSub!: Subscription;

  cart: Service[] = [];
  private cartChangeSub!: Subscription;


  constructor(private slService: ShoppingListService, private formBuilder: FormBuilder) {

  }

  isAllSubmitted: boolean = false;

  ngOnInit(): void {

    // this.categories = this.slService.getCategories();
    // this.igChangeSub = this.slService.categoriesChanged
    // .subscribe(
    //   (categories: Category[]) => {
    //     this.categories = categories;
    //   }
    // );

    this.cart = this.slService.getServiceCart();
    this.cartChangeSub = this.slService.cartChanged

      .subscribe(
        (cart: Service[]) => {
          this.cart = cart;
          this.isAllSubmitted = this.checkAllSubmittedInfo();
        }
      );
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    // this.igChangeSub.unsubscribe();
    this.cartChangeSub.unsubscribe();
  }

  // onCategoryAdded(category: Category) {
  //   this.categories.push(category);
  // }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  // onEditItem(index: number) {
  //   this.slService.startedEditing.next(index);
  // }

  onDeleteCart(index: number) {
    this.slService.deleteServiceFromCart(index);
    // this.onClearCart();
  }


  onChange(change: MatSelectionListChange, index: number) {
    this.slService.getServiceCart()[index].database = change.option.value;
    console.log(change.option.value, change.option.selected);
  }

  onChange2(change: MatSelectionListChange, index: number) {
    this.slService.getServiceCart()[index].shippingMode = change.option.value;
    console.log(change.option.value, change.option.selected);
  }

  onChange3(change: MatSelectionListChange, index: number) {
    // this.slService.getServiceFromCart(index).inputAddress = change.option.value;
    console.log(change.option.value, change.option.selected);
  }

  checkAllSubmittedInfo() {
    let isAllSummitted: boolean = true;
    for (let index = 0; index < this.cart.length; index++) {
      if (this.cart[index].productRelatedInformation.length === 0) {
        isAllSummitted = false;
        break;
      }
    }
    console.log(isAllSummitted);

    return isAllSummitted;
  }

}
