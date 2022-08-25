import { Component, NgModule, OnInit, ViewChild } from "@angular/core";
import { FormGroup, NgForm, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { AuthUsrService } from "./authUsr.service";
import { first } from 'rxjs/operators';

import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from "../alert/alert.service";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-authUsr',
    templateUrl: './authUsr.component.html',
})


export class AuthUsrComponent {

    // @ViewChild('authForm')
    // authForm!: NgForm;

    // isLoginMode = true;

    // error!: string;
    // success!: string;

    private userChangeSub!: Subscription;

    ngOnInit() {
        this.userChangeSub = this.authUsrService.userObservable
            .subscribe(
                (user: any) => {
                    this.user = user
                }
            );
    }

    // onSwitchMode() {
    //     this.isLoginMode = !this.isLoginMode;
    // }

    // onSubmit(form: NgForm) {
    //     console.log(form.value);
    //     if (this.authUsrService.login(form.value.userName, form.value.password)) {
    //         this.success = 'Logged in successfully!';
    //         this.error = '';
    //     } else {
    //         this.error = 'An error occurred!';
    //         this.success = '';

    //     }
    //     // form.reset();
    // }

    // onLogout() {
    //     this.authUsrService.logout();
    //     this.success = 'Logged out successfully!';
    //     this.error = '';
    // }

    // // private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    // //     let d:Date = new Date();
    // //     d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    // //     let expires:string = `expires=${d.toUTCString()}`;
    // //     let cpath:string = path ? `; path=${path}` : '';
    // //     document.cookie = `${name}=${value}; ${expires}${cpath}`;
    // // }

    // onChange(event: any) {

    //     switch (event.target.value) {
    //         case "clem": {
    //             //statements; 
    //             this.onClemAccountClick();
    //             break;
    //         }
    //         case "heverett": {
    //             //statements; 
    //             this.onHeverettAccountClick();
    //             break;
    //         }
    //         case "jubic": {
    //             //statements; 
    //             this.onJubicAccountClick();
    //             break;
    //         }
    //         default: {
    //             //statements; 
    //             break;
    //         }
    //     }


    // }

    // onClemAccountClick() {
    //     this.authForm.setValue({
    //         // server: "CEA",
    //         userName: "clem",
    //         password: "123"
    //     })
    // }

    // onHeverettAccountClick() {
    //     this.authForm.setValue({
    //         // server: "Heverett",
    //         userName: "heverett",
    //         password: "123"
    //     })
    // }

    // onJubicAccountClick() {
    //     this.authForm.setValue({
    //         // server: "Heverett",
    //         userName: "jubic",
    //         password: "123"
    //     })
    // }




    // currentRoute!: string;
    // constructor(private router: Router, location: Location) {
    //     // this.currentRoute = this.router.url;
    //     // console.log('Location >>>> ',this.currentRoute);
    //     router.events.subscribe(val => {
    //         this.currentRoute = location.path();
    //         console.log('Location >>>> ', this.currentRoute);
    //     });
    // }

    user: any;

    constructor(private authUsrService: AuthUsrService) {
        this.user = this.authUsrService.userValue;
        console.log("testttttt", this.user);

    }

    logout() {
        this.authUsrService.logout();
    }

}