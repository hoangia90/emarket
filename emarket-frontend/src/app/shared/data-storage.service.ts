import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductService } from "../products/product.service";
import { Product } from "../products/product.model";
import { map, tap } from 'rxjs/operators';
import { PostService } from "../posts/post.service";
import { Post } from "../posts/post.model";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private productService: ProductService, private postService: PostService) {

    }

    title = 'Demo';
    greeting = {};

    storeProducts() {
        const products = this.productService.getProducts();
        return this.http.put('https://data-demo-f79d3-default-rtdb.europe-west1.firebasedatabase.app/products.json', products).subscribe(response => {
            console.log(response);
        });
    }

    fetchProducts() {
        return this.http.get<Product[]>('https://data-demo-f79d3-default-rtdb.europe-west1.firebasedatabase.app/products.json')
            .pipe(map(products => {
                return products.map(product => {
                    return { ...product, categories: product.categories ? product.categories : [] };
                });
            }),
                tap(products => {
                    this.productService.setProducts(products);
                })
            )

        // return this.http.get('resource').subscribe(data => this.greeting = data);

    }

    fetchPosts() {
        return this.http.get<Post[]>('https://data-demo-f79d3-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
            .pipe(map(posts => {
                return posts.map(post => {
                    return { ...post, categories: post.categories ? post.categories : [] };
                });
            }),
                tap(posts => {
                    this.postService.setPosts(posts);
                })
            )

        // return this.http.get('resource').subscribe(data => this.greeting = data);

    }

    // CEA server
    private data: any = []
    getData() {
        // const url = 'https://api.bigpi.eu:8443/swagger-ui.html#!/Bigpi_Digital_Service_Management/getFHEDigitalServiceById_1/ob.json'
        // this.http.get(url).subscribe((res) => {
        //     this.data = res
        //     console.log(this.data)
        // })

        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/json',
        //         'Cookie': 'SESSION=7f82ad8e-ad45-40e0-87bc-d202e281b497',
        //         'allowCredentials': 'true',
        //         'Authorization': 'Basic',
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
        //         'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        //         'Access-Control-Allow-Credentials': 'true'
        //     }),
        //     // withCredentials: true,
        //     observe: 'response' as 'response'
        // };
        
        let newestProductID = this.productService.getProduct(this.productService.getProducts().length - 1).id;

        const url = '/api1/openapi/v1/client/proxy?URL=https%3A%2F%2Fapi.bigpi.eu%3A8443%2Fapi%2Fdmp-digital-service%2Fopenapi%2Fv1%2Fbigpi-digital-service%2Flist';
        // const url = '/api1/dmp-digital-service/openapi/v1/bigpi-digital-service/list';
        // const url = '/api1/openapi/v1/client/drivingLicenses?partnerID=1';
        // const url = '/proxy/https://api.bigpi.eu:8443/swagger-ui.html#!/Bigpi_Digital_Service_Management/getFHEDigitalServiceById_1';
        const headers = {
            'content-type': 'application/json'
        };
        return this.http.get<any>(url, { headers: headers, responseType: 'json' })
        .pipe(map(products => {
            const productArray = [];
            for (const productKey in products) {
                
                // product = new Product(newestProductID + 1, responseData[key]. );
                console.log("      key:", productKey, "value:", products[productKey]);
                // newestProductID = newestProductID + 1;

                let newProduct: Product = new Product(0,'','','',[],0,0,'',0,'',[],[],0,'','',''); 

                for (const ekey in products[productKey] ) {
                    console.log("      key:", ekey, "value:", (products[productKey])[ekey] );
                    if (ekey == 'digSerId') {
                        newProduct.id = (products[productKey])[ekey];
                    }
                    if (ekey == 'digSerName') {
                        newProduct.name = (products[productKey])[ekey];
                    }
                    if (ekey == 'digSerDescription') {
                        newProduct.description = (products[productKey])[ekey];
                    }
                    if (ekey == 'digserviceApi') {
                        newProduct.productUrl = (products[productKey])[ekey];
                    }
                    if (ekey == 'digSerSpec') {
                        newProduct.specification = (products[productKey])[ekey];
                    }
                    newProduct.imagePath = 'https://www.cea.fr/presse/PublishingImages/Vignettes/plan-cloud.jpg';
                 }
                 productArray.push(newProduct);
            }
            return productArray;
        }),
        tap(products => {
            this.productService.setProducts(products);
            // this.productService.
        })
        )
        .subscribe(response => {
            console.log(response);
        })
        ;



        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/json',
        //         // 'allowCredentials': 'true',
        //         // 'Authorization': 'Basic',
        //         // 'Access-Control-Allow-Origin': '*',
        //         // 'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
        //         // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        //         // 'Access-Control-Allow-Credentials': 'true'
        //     }),

        //     withCredentials: true,
        //     observe: 'response' as 'response'
        // };

        // // const url = 'https://api.bigpi.eu:8443/login';
        // const url = '/api2/login';
        // // const url = 'localhost:9292/api/openapi/v1/client/drivingLicenses?partnerID=1';
        // // const url = '/api/openapi/v1/client/drivingLicenses?partnerID=1';
        // const headers = { 'content-type': 'application/json' };
        // const body = JSON.stringify("[{'username': 'bigpiadmin', 'password': 'BigadminPi;123'}]");
        // // return this.http.post<any>(url, body,{'headers':headers}).subscribe(response => {
        // //     console.log(response);
        // return this.http.post<any>(url, body, {'headers':headers}).subscribe(response => {
        //     console.log(response);
        //     // return this.http.get(url).subscribe(response => {
        //     //     console.log(response);
        //     });

    }

}