import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductEditComponent } from "./products/product-edit/product-edit.component";
import { ProductStartComponent } from "./products/product-start/product-start.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { ProductsResolverService } from "./products/products-resolver.service";
import { ProductsComponent } from "./products/products.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthUsrComponent } from "./authUsr/authUsr.component";

import { PostsComponent } from "./posts/posts.component";
import { PostEditComponent } from "./posts/post-edit/post-edit.component";
import { PostDetailComponent } from "./posts/post-detail/post-detail.component";
import { PostsResolverService } from "./posts/posts-resolver.service";
import { PostComponent } from "./posts/post-list/post/post.component";
import { CategoriesComponent } from "./categories/categories.component";
import { TagsComponent } from "./tags/tags.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { UsersComponent } from "./users/users.component";
import { OrdersComponent } from "./orders/orders.component";
import { ServersComponent } from "./servers/servers.component";
import { RegisterComponent } from "./authUsr/register/register.component";
import { LoginComponent } from "./authUsr/login/login.component";
import { UserListComponent } from "./users/user-list/user-list.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { ProductListComponent } from "./products/product-list/product-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    // { path: '#carouselExampleIndicators', redirectTo: '/products', pathMatch: 'full'},

    { path: '', redirectTo: '/products', pathMatch: 'full' },

    // { path: '', component: ProductListComponent },
    {
        path: 'products', component: ProductsComponent, children: [
            { path: '', component: ProductStartComponent },
            { path: 'new', component: ProductEditComponent },
            { path: ':id', component: ProductDetailComponent, resolve: [ProductsResolverService] },
            { path: ':id/edit', component: ProductEditComponent, resolve: [ProductsResolverService] }
        ]
    },
    // { path: 'blog', component: PostsComponent },
    {
        path: 'blog', component: PostsComponent, children: [
            // { path: '', component: PostStartComponent },
            { path: 'new', component: PostEditComponent },
            { path: ':id', component: PostDetailComponent, resolve: [PostsResolverService] },
            { path: ':id/edit', component: PostEditComponent, resolve: [PostsResolverService] }
        ]
    },

    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'dashboard', component: DashboardComponent },
    // { path: 'blog', component: BlogComponent },
    // { path: 'blog', component: PostsComponent },
    { path: 'authenticate', component: AuthComponent },
    {
        // path: 'userAuthenticate', component: AuthUsrComponent,children: [
        path: 'userAuthenticate', component: AuthUsrComponent, children: [
            // { path: 'register', component: RegisterComponent },
            // { path: 'login', component: LoginComponent },
        ]
    },
    { path: 'categories', component: CategoriesComponent },
    { path: 'tags', component: TagsComponent },
    { path: 'carousel', component: CarouselComponent },

    {
        path: 'users', component: UsersComponent, children: [
        // path: 'users', component: UserListComponent, children: [
            // { path: 'list', component: UserListComponent },
            { path: '', component: UserListComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent },
            // { path: 'login', component: LoginComponent },
            // { path: '', component: UserListComponent },
            { path: 'add', component: UserEditComponent },
            { path: 'new', component: UserEditComponent },
            { path: ':id/edit', component: UserEditComponent }
        ]
    },

    { path: 'orders', component: OrdersComponent },
    { path: 'servers', component: ServersComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]

})

export class AppRoutingModule {

}