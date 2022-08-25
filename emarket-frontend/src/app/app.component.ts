import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthUsrService } from './authUsr/authUsr.service';
import { Service } from './shopping-list/service.model';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { User } from './users/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {
  // @Output() sidenavToggledfromTopnavReceived = new EventEmitter<void>();

  // For sisebar property
  opened = true;
  // showSecret = false;
  // log: Date[] = [];

  currentRoute!: string;

  productsCountInCart: number = 0;
  currentUser!: null;
  currentUserID = '';
  cart!: Service[];

  private cartChangeSub!: Subscription;
  private userChangeSub!: Subscription;

  constructor(private router: Router, private slService: ShoppingListService, private authUsrService: AuthUsrService) {
    this.currentRoute = this.router.url;
    console.log('Location >>>>> ', this.currentRoute);
  }

  ngOnInit() {
    // Load current cart
    this.cart = this.slService.getServiceCart();
    this.productsCountInCart = this.cart.length;
    this.updateCurrentCart();

    // Auto login
    // this.authUsrService.autoLogin();
    this.authUsrService.login
    // this.currentUser = this.authUsrService.getCurrentUser();
    this.currentUser = this.authUsrService.userValue;
    this.updateCurrentUser();
  }

  updateCurrentUser() {
    // this.userChangeSub = this.authUsrService.currentUserSubject
    this.userChangeSub = this.authUsrService.userObservable
      .subscribe(
        (user: any) => {
          if (user) {
            this.currentUser = user;
            this.currentUserID = user.id;
          } else {
            this.currentUser = null;
            this.currentUserID = '';
          }
        }
      );
  }

  updateCurrentCart() {
    this.cartChangeSub = this.slService.cartChanged
      .subscribe(
        (cart: Service[]) => {
          this.cart = cart;
          this.productsCountInCart = cart.length;
        }
      );
  }

  // onToggleDetails() {
  //   this.showSecret = !this.showSecret;
  //   // this.log.push(this.log.length + 1);
  //   this.log.push(new Date());
  // }

  sidenavToggledReceived() {
    this.opened = !this.opened;
    // this.sidenavToggledfromTopnavReceived.emit();
    // return this.isOpened;
  }

  // loadedFeature = 'recipe';
  // onNavigate(feature: string) {
  //   this.loadedFeature = feature;
  // }

}
