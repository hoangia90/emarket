import { Component, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { Server } from "../servers/server.model";
import { ServerService } from "../servers/server.service";
import { AuthService } from "./auth.service";
// import { CookieService } from 'angular2-cookie/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    @ViewChild('authForm')
    authForm!: NgForm;

    error!: string;
    success!: string;

    // dfUrl = 'https://api.bigpi.eu:8443/login';
    // dfUserName = 'bigpiadmin';
    // dfPassword = 'BigadminPi;123';

    // @ViewChild('authForm')
    // authForm!: NgForm;

    selectedServer!: Server;
    servers!: Server[];

    constructor(private authService: AuthService, private serverService: ServerService) {

    }

    ngOnInit() {
        this.servers = this.serverService.getServers();
    }

    onServerChanged(selectedServer: Server) {
        this.selectedServer = selectedServer;
        this.authForm.setValue({
            authUrl: this.selectedServer.authUrl,
            userName: this.selectedServer.userName,
            password: this.selectedServer.password
        })
    }

    onSubmit(form: NgForm) {
        // console.log(form.value);
        if (!this.selectedServer) {
            this.selectedServer = new Server(
                // Server Name,
                '',
                '',
                form.value.userName,
                form.value.password,
                form.value.authUrl,
                //
                '',
                '',
                '',
            );
        }

        this.authService.AutBackEnd(this.selectedServer.authUrl, this.selectedServer.userName, this.selectedServer.password).subscribe(
            resData => {
                console.log(resData);
                // this.cookieService.set(key);
                // localStorage.setItem('server', JSON.stringify(this.selectedServer.authUrl));
                this.success = 'Logged in successfully!';
                this.error = '';

                switch (this.selectedServer.authUrl) {
                    case "https://jubic.bigpi.eu:8443/login":
                        // localStorage.setItem('server', JSON.stringify("jubic"));
                        localStorage.setItem('server', JSON.stringify(this.selectedServer));
                        break;
                    case "https://heverett.bigpi.eu:8443/login":
                        // localStorage.setItem('server', JSON.stringify("heverett"));
                        localStorage.setItem('server', JSON.stringify(this.selectedServer));
                        break;
                    case "https://ecorridor-fhe.iit.cnr.it:8443/login":
                        // localStorage.setItem('server', JSON.stringify("ecorridor"));
                        localStorage.setItem('server', JSON.stringify(this.selectedServer));
                        break;
                    case "https://clem.bigpi.eu:8443/login":
                        // localStorage.setItem('server', JSON.stringify("ecorridor"));
                        localStorage.setItem('server', JSON.stringify(this.selectedServer));
                        break;
                    default:
                        break;
                }


                // for (const key in resData) {
                //     for (const ekey in resData[key]) {
                //         console.log("      key:", ekey, "value:", (resData[key])[ekey]);
                //         if (ekey == 'Cookie') {
                //             this.cookieService.put( ekey, (resData[key])[ekey] );
                //         }
                //     }
                // }
            },
            error => {
                console.log(error);
                this.error = 'An error occurred!';
                this.success = '';
            }
        );
        // form.reset();
    }

}