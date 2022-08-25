
import { Category } from "../categories/category.model";
import { Subject } from 'rxjs';
import { ProductRelatedInformation } from "./product-related-information.model";
import { Service } from "./service.model";
// import { OnInit } from "@angular/core";


export class ShoppingListService {

    categoriesChanged = new Subject<Category[]>();

    startedEditing = new Subject<number>();

    cartChanged = new Subject<Service[]>();

    // private categories: Category[] = [
    //     new Category(1, 'Pattern Search'),
    //     new Category(2, 'Standard'),
    // ];


    private cart: Service[] = [
        // new Service(
        //     '0',
        //     '0',
        //     'Blacklist-IP',
        //     // 'algorithm', 
        //     // 'http://gia.com', 
        //     // '', 
        //     '',
        //     '',
        //     50,
        //     1,
        //     []
        // ),
        // new Service(
        //     '1',
        //     '1',
        //     'Threshold Comparison',
        //     // 'algorithm', 
        //     // 'http://gia.com', 
        //     // '', 
        //     '',
        //     '',
        //     50,
        //     1,
        //     []
        // )
    ];

    constructor() {
        // Add default services for testing
        // let a: ProductRelatedInformation[] = [];
        // let b: ProductRelatedInformation[] = [];
        // this.addServiceToCart(new Service(0, '0', 'Blacklist-IP', 'algorithm', 'http://gia.com', '', '', '', 50, a));
        // this.addServiceToCart(new Service(1, '1', 'Threshold Comparison', 'algorithm', 'http://gia.com', '', '', '', 50, b));

        // Add default categories for testing
        // this.addCategories([
        //     new Category(1, 'Pattern Search'),
        //     new Category(2, 'Standard'),
        // ]);
    }

    // Category
    // getCategories() {
    //     return this.categories.slice();
    // }

    // getCategory(index: number) {
    //     return this.categories[index];
    // }

    // addCategory(category: Category) {
    //     this.categories.push(category);
    //     this.categoriesChanged.next(this.categories.slice());
    // }

    // addCategories(categories: Category[]) {
    //     this.categories.push(...categories);
    //     this.categoriesChanged.next(this.categories.slice());
    // }

    // updateCategory(index: number, newCategory: Category) {
    //     this.categories[index] = newCategory;
    //     this.categoriesChanged.next(this.categories.slice());
    // }

    // deleteCategory(index: number) {
    //     this.categories.splice(index, 1);
    //     this.categoriesChanged.next(this.categories.slice());
    // }

    // Shopping Cart
    getServiceCart() {
        return this.cart.slice();
    }

    // getServiceFromCart(index: number) {
    //     return this.cart[index];
    // }

    getServiceFromCartBySid(sid: string) {
        let i!: number;
        for (let index = 0; index < this.cart.length; index++) {
            const element = this.cart[index];
            if (sid == element.id) {
                i = index;
                break;
            }

        }
        // return this.getServiceFromCart(i);
        return this.cart[i];
    }

    // addServiceToCart(service: Service) {
    //     this.cart.push(service);
    //     this.cartChanged.next(this.cart.slice());
    // }

    addServiceToCartAndMerge(service: Service) {
        // this.cart.push(service);
        let isIn = false;
        let sid = service.id;
        this.cart.forEach(element => {
            if (element.productId == service.productId) {
                isIn = true;
                element.quantity = element.quantity + service.quantity;
                sid = element.id;
            }
        });
        if (!isIn) {
            this.cart.push(service);
        }
        this.cartChanged.next(this.cart.slice());
        return sid;
    }

    addServicesToCart(services: Service[]) {
        this.cart.push(...services);
        this.cartChanged.next(this.cart.slice());
    }

    deleteServiceFromCart(index: number) {
        this.cart.splice(index, 1);
        this.cartChanged.next(this.cart.slice());
    }

    updateServiceCart(index: number, newService: Service) {
        this.cart[index] = newService;
        this.cartChanged.next(this.cart.slice());
    }

    addServiceProductRelatedInfo(sid: string, productRelatedInfo: ProductRelatedInformation[]) {
        return this.getServiceFromCartBySid(sid).productRelatedInformation = productRelatedInfo;
    }

}