import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductComponent } from './products/product-list/product/product.component';
import { ProductStartComponent } from './products/product-start/product-start.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductService } from './products/product.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { QuillModule } from 'ngx-quill';
import { FooterComponent } from './footer/footer.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { GoogleChartsModule } from 'angular-google-charts';
import { AuthComponent } from './auth/auth.component';
import { AuthUsrComponent } from './authUsr/authUsr.component';

import { EncryptDataComponent } from './shopping-list/encrypt-data/encrypt-data.component';
import { SendDataToCloudComponent } from './shopping-list/send-data-to-cloud/send-data-to-cloud.component';
import { GetResultFromCloudComponent } from './shopping-list/get-result-from-cloud/get-result-from-cloud.component';
import { DecryptDataComponent } from './shopping-list/decrypt-data/decrypt-data.component';
import { PostsComponent } from './posts/posts.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostComponent } from './posts/post-list/post/post.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostService } from './posts/post.service';
import { CarouselService } from './carousel/carousel.service';
import { CarouselComponent } from './carousel/carousel.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryService } from './categories/category.service';
import { TagsComponent } from './tags/tags.component';
import { TagService } from './tags/tag.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { AddToShoppingCartDialogComponent } from './products/add-to-shopping-cart-dialog/add-to-shopping-cart-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { AddToShoppingCartDialogAlertComponent } from './products/add-to-shopping-cart-dialog-alert/add-to-shopping-cart-dialog-alert.component';
import { UserService } from './users/user.service';
import { UserComponent } from './users/user/user.component';
import { ServerService } from './servers/server.service';
import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './authUsr/login/login.component';
import { RegisterComponent } from './authUsr/register/register.component';
import { ErrorInterceptor } from './authUsr/error.interceptor';
import { fakeBackendProvider } from './authUsr/fake-backend';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { JwtInterceptor } from './authUsr/jwt.interceptor';

// import { MatSnackBar } from '@angular/material/snack-bar';

// import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { LightgalleryModule } from 'lightgallery/angular';

// import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthUsrService } from './authUsr/authUsr.service';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    HeaderComponent,
    ProductsComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    FooterComponent,
    DropdownDirective,
    SidebarComponent,
    ProductStartComponent,
    ProductEditComponent,
    DashboardComponent,
    PostsComponent,
    PostListComponent,
    PostDetailComponent,
    PostComponent,
    PostEditComponent,
    AuthComponent,
    AuthUsrComponent,
    EncryptDataComponent,
    SendDataToCloudComponent,
    GetResultFromCloudComponent,
    DecryptDataComponent,
    CarouselComponent,
    CategoriesComponent,
    TagsComponent,
    UsersComponent,
    OrdersComponent,
    AddToShoppingCartDialogComponent,
    AddToShoppingCartDialogAlertComponent,
    UserComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    UserEditComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    QuillModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatStepperModule,
    MatBadgeModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    GoogleChartsModule.forRoot(),
    MatSelectModule,
    MatDialogModule,
    // MatSnackBar,
    
    // LightgalleryModule,
    // MatCarouselModule.forRoot(),
    // NgbModule,
    // SlickCarouselModule
    // HttpModule,
    // QuillModule,

  ],
  providers: [
    ShoppingListService, 
    ProductService, 
    UserService, 
    PostService, 
    CarouselService, 
    CategoryService, 
    TagService, 
    ServerService,
    AuthUsrService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    // provider used to create fake backend
    // fakeBackendProvider
    // { provide: LocationStrategy, useClass: PathLocationStrategy }
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }