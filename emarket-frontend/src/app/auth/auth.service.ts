import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductService } from "../products/product.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient, private productService: ProductService) {

    }
    
    private data: any = []
    AutBackEnd(authUrl : string, userName : string, password : string) {
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

        // const url = '/api1/openapi/v1/client/proxy?URL=https%3A%2F%2Fapi.bigpi.eu%3A8443%2Fapi%2Fdmp-digital-service%2Fopenapi%2Fv1%2Fbigpi-digital-service%2Flist';
        // // const url = '/api1/dmp-digital-service/openapi/v1/bigpi-digital-service/list';
        // // const url = '/api1/openapi/v1/client/drivingLicenses?partnerID=1';
        // // const url = '/proxy/https://api.bigpi.eu:8443/swagger-ui.html#!/Bigpi_Digital_Service_Management/getFHEDigitalServiceById_1';
        // const headers = {
        //     'content-type': 'application/json'
        // };
        // return this.http.get<any>(url, { 'headers': headers }).subscribe(response => {
        //     console.log(response);
        // });



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

        //     withCredentials: true,heverett
        // const url = 'https://api.bigpi.eu:8443/login';
        // const url = '/api1/openapi/v1/client/login?partnerLoginURL=https%3A%2F%2Fapi.bigpi.eu%3A8443%2Flogin&pw=BigadminPi%3B123&userName=bigpiadmin';
        // const url = window.location.protocol + '//' + window.location.hostname + ':9292/openapi/v1/client/login?partnerLoginURL=' + encodeURI(authUrl) + '&pw=' + encodeURI(password) + '&userName=' + encodeURI(userName);
        const url = '/api1/openapi/v1/client/login?partnerLoginURL=' + encodeURI(authUrl) + '&pw=' + encodeURI(password) + '&userName=' + encodeURI(userName);
    
        // this._httpClient.post(window.location.protocol + '//' + window.location.hostname + ':3000/' + 'users/login', user)
        // const url = 'http://192.168.1.134:9292/api/openapi/v1/client/drivingLicenses?partnerID=1';
        // const url = '/api/openapi/v1/client/drivingLicenses?partnerID=1';
        const headers = { 'content-type': 'application/json' };
        // const body = JSON.stringify("[{'username': 'bigpiadmin', 'password': 'BigadminPi;123'}]");
        const body = JSON.stringify("");
        // return this.http.post<any>(url, body,{'headers':headers}).subscribe(response => {
        //     console.log(response);
        // return this.http.post<any>(url, body, {'headers':headers})
        return this.http.get<any>(url, {'headers':headers})
        // const res = this.http.get<any>(url, {'headers':headers});
        // console.log(res);
        // return res
        // .subscribe(response => {
        //     console.log(response);
        //     // return this.http.get(url).subscribe(response => {
        //     //     console.log(response);
        //     })
            ;

    }

}