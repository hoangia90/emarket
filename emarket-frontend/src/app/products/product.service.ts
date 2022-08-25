import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Category } from "../categories/category.model";
import { Service } from "../shopping-list/service.model";
import { Tag } from "../tags/tag.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Product } from "./product.model";
import { MatDialog } from '@angular/material/dialog';
import { AddToShoppingCartDialogComponent } from "./add-to-shopping-cart-dialog/add-to-shopping-cart-dialog.component";
import { AddToShoppingCartDialogAlertComponent } from "./add-to-shopping-cart-dialog-alert/add-to-shopping-cart-dialog-alert.component";

@Injectable()
export class ProductService {

    isItemClicked = new EventEmitter<boolean>();;

    productsChanged = new Subject<Product[]>();

    private products: Product[] = [
        new Product(
            0,
            'Blacklist-IP',
            'Black list ip verification based on collaborative database',
            'assets/images/ip.jpg',
            [
                'assets/images/ip.jpg',
                'https://cdn-chdai.nitrocdn.com/RQszEOEhikKKehixynYTvKdGZTDZOXsv/assets/static/optimized/rev-3b332ef/wp-content/uploads/2019/01/IP_ssl-1024x384.png'
            ],
            50,
            50,
            'EUR',
            100,
            'http://localhost:4200/products/0',
            [
                new Category(
                    '00',
                    'Computer',
                    'null'
                ),
                new Category(
                    '0001',
                    'Software',
                    '00'
                ),
                new Category(
                    '000100',
                    'Cyber Security',
                    '0001'
                ),
            ],
            [
                new Tag(
                    0,
                    'FHE'
                ),
                new Tag(
                    1,
                    'SEAL'
                ),
            ],
            5,
            '01/01/2022',
            '01/01/2022',
            'inactivated'
        ),

        new Product(
            1,
            'Threshold Comparison',
            'Measuring the value against a threshold value',
            'assets/images/cold-temperature.jpg',
            [],
            50,
            50,
            'EUR',
            100,
            'http://localhost:4200/products/1',
            [
                new Category(
                    '00',
                    'Computer',
                    'null'
                ),
                new Category(
                    '0001',
                    'Software',
                    '00'
                ),
                new Category(
                    '000100',
                    'Cyber Security',
                    '0001'
                ),
            ],
            [
                new Tag(
                    0,
                    'FHE'
                ),
                new Tag(
                    1,
                    'SEAL'
                ),
            ],
            5,
            '01/01/2022',
            '01/01/2022',
            'activated'
        ),

        new Product(
            2,
            'Driving License Validity Checker',
            'Checking existence of an encrypted value in encrypted data',
            'assets/images/driving-license.jpg',
            [],
            50,
            50,
            'EUR',
            100,
            'http://localhost:4200/products/2',
            [
                new Category(
                    '00',
                    'Computer',
                    'null'
                ),
                new Category(
                    '0001',
                    'Software',
                    '00'
                ),
                new Category(
                    '000100',
                    'Cyber Security',
                    '0001'
                ),
            ],
            [
                new Tag(
                    0,
                    'FHE'
                ),
                new Tag(
                    1,
                    'SEAL'
                ),
            ],
            5,
            '01/01/2022',
            '01/01/2022',
            'activated'
        ),

        new Product(
            3,
            'Spam Email Checker',
            'Verification spam email',
            'assets/images/spam-checker.jpg',
            [],
            50,
            50,
            'EUR',
            100,
            'http://localhost:4200/products/3',
            [
                new Category(
                    '00',
                    'Computer',
                    'null'
                ),
                new Category(
                    '0001',
                    'Software',
                    '00'
                ),
                new Category(
                    '000100',
                    'Cyber Security',
                    '0001'
                ),
            ],
            [
                new Tag(
                    0,
                    'FHE'
                ),
                new Tag(
                    1,
                    'SEAL'
                ),
            ],
            5,
            '01/01/2022',
            '01/01/2022',
            'inactivated'
        ),

        new Product(
            4,
            'Dummy Algorithm',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus, leo id pulvinar vestibulum, ligula nisl tincidunt magna, eu volutpat leo neque quis justo. Fusce semper ante id mi porta porta. Pellentesque nec pretium purus. Curabitur lobortis tempus consectetur. Nam ullamcorper gravida erat sed suscipit. Morbi quis porttitor nunc. Suspendisse lacinia a turpis vitae laoreet. Aliquam pellentesque scelerisque urna. Cras vulputate nisi sed elit commodo cursus. Aenean interdum, erat at convallis dictum, urna enim tincidunt nisi, vitae tempor nisi nisi a tellus. Aliquam volutpat dui eget gravida eleifend. Nullam pulvinar justo eget tellus commodo, eget molestie dui convallis. Curabitur at fermentum lorem. Maecenas porttitor sem ut enim efficitur bibendum et vel metus.',
            'assets/images/cyber-security.jpg',
            [],
            0,
            0,
            'EUR',
            100,
            'http://localhost:4200/products/4',
            [
                new Category(
                    '00',
                    'Computer',
                    'null'
                ),
                new Category(
                    '0001',
                    'Software',
                    '00'
                ),
                new Category(
                    '000100',
                    'Cyber Security',
                    '0001'
                ),
            ],
            [],
            5,
            '01/01/2022',
            '01/01/2022',
            'discontinued'
        ),

    ];

    addDummyProducts(n: number) {
        let productsLength = this.products.length;
        for (let i = productsLength; i < productsLength + n; i++) {
            let p = new Product(
                i,
                'Dummy Algorithm',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus, leo id pulvinar vestibulum, ligula nisl tincidunt magna, eu volutpat leo neque quis justo. Fusce semper ante id mi porta porta. Pellentesque nec pretium purus. Curabitur lobortis tempus consectetur. Nam ullamcorper gravida erat sed suscipit. Morbi quis porttitor nunc. Suspendisse lacinia a turpis vitae laoreet. Aliquam pellentesque scelerisque urna. Cras vulputate nisi sed elit commodo cursus. Aenean interdum, erat at convallis dictum, urna enim tincidunt nisi, vitae tempor nisi nisi a tellus. Aliquam volutpat dui eget gravida eleifend. Nullam pulvinar justo eget tellus commodo, eget molestie dui convallis. Curabitur at fermentum lorem. Maecenas porttitor sem ut enim efficitur bibendum et vel metus.',
                'assets/images/cyber-security.jpg',
                [],
                0,
                0,
                'EUR',
                100,
                'http://localhost:4200/products/' + i,
                [
                    new Category(
                        '00',
                        'Computer',
                        'null'
                    )
                ],
                [],
                5,
                '01/01/2022',
                '01/01/2022',
                'EOL'
            );
            this.products.push(p);
        }
    }

    constructor(
        private slService: ShoppingListService,
        private dialog: MatDialog
    ) {
        this.addDummyProducts(20);
    }

    setProducts(products: Product[]) {
        this.products = products;
        this.productsChanged.next(this.products.slice());
    }

    getProducts() {
        return this.products.slice();
    }

    getProduct(index: number) {
        // return this.products.slice()[index];
        return this.products[index];
    }

    addServideToCartwQty(product: Product, qty: number) {
        // const service = new Service(this.slService.getCart.length, product.id, product.name, product.description, product.inputAddress, product.databaseAddress, product.shippingMode, product.price);
        // const service = new Service(this.slService.getServiceCart.length, product.id.toString(), product.name, product.description, '', '', '', '', product.price, []);
        // const service = new Service(this.slService.getServiceCart.length, product.id.toString(), product.name, '', '', product.price, qty, []);
        // this.slService.addServiceToCart(service);
        // this.slService.addServiceToCartAndMerge(service);
        // console.log(service);

        let msg = '';
        if (product.status === "activated") {
            if (
                (product.id == 1 && JSON.parse(localStorage.getItem('server') || '').name == "Jubic") ||
                (product.id == 1 && JSON.parse(localStorage.getItem('server') || '').name == "Heverett") ||
                (product.id == 2 && JSON.parse(localStorage.getItem('server') || '').name == "Ecorridor") ||
                ( (product.id == 2 || product.id == 1) && JSON.parse(localStorage.getItem('server') || '').name == "Clem")
            ) {
                // let newSid = this.slService.getServiceCart()[this.slService.getServiceCart.length].id + 1;
                // let newSid: number = product.id;
                let newSid = new Date().toUTCString();
                const service = new Service(newSid, product.id.toString(), product.name, '', '', product.price, 1, []);

                const sid = this.slService.addServiceToCartAndMerge(service);

                const totalQty = this.slService.getServiceFromCartBySid(sid).quantity;
                if (totalQty > 1) {
                    msg = product.name + ' (x' + totalQty + ') is added into your shopping cart !';
                } else {
                    msg = product.name + ' is added into your shopping cart !';
                }
                const dialogRef = this.dialog.open(AddToShoppingCartDialogComponent, {
                    data: {
                        message: msg,
                        buttonText: {
                            cancel: 'Cancel'
                        }
                    },
                });
                console.log(service);
            } else {
                msg = 'Not support for ' + JSON.parse(localStorage.getItem('server') || '') + ' !';
                const dialogRef = this.dialog.open(AddToShoppingCartDialogAlertComponent, {
                    data: {
                        message: msg,
                        buttonText: {
                            cancel: 'Cancel'
                        }
                    },
                });
            }

        } else {
            msg = 'Could not add this product, this product is ' + product.status + ' !';
            const dialogRef = this.dialog.open(AddToShoppingCartDialogAlertComponent, {
                data: {
                    message: msg,
                    buttonText: {
                        cancel: 'Cancel'
                    }
                },
            });
        }
    }

    addProduct(product: Product) {
        this.products.push(product);
        this.productsChanged.next(this.products.slice());
    }

    updateProduct(index: number, newProduct: Product) {
        this.products[index] = newProduct;
        this.productsChanged.next(this.products.slice());
    }

    deleteProduct(index: number) {
        this.products.splice(index, 1);
        this.productsChanged.next(this.products.slice());
    }

    // addCategoriesToShoppingList(categories: string[]) {
    //     this.slService.addCategories(categories);
    // }

}