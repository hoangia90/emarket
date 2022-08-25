import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, NgForm, FormBuilder, Validators } from "@angular/forms";
import { delay, dematerialize, first, materialize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthUsrService } from "../authUsr.service";
import { AlertService } from "src/app/alert/alert.service";
import { throwError } from "rxjs";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    form!: FormGroup;
    loading = false;
    submitted = false;

    // msg!: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authUsrService: AuthUsrService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        // console.log('here!!!!', this.f);

        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        this.authUsrService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    // console.log('hereeeeehereeeee');
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/userAuthenticate';
                    console.log('This is return Url', returnUrl);
                    this.router.navigateByUrl(returnUrl);
                },
                error: (error: string) => {
                    // console.log('hereeeee', error);
                    this.alertService.error(error);
                    this.loading = false;
                    return throwError({ status: 401, error: { message: 'Unauthorized' } })
                        .pipe(materialize(), delay(500), dematerialize());
                }
            })
            ;

        // let isSuccess = this.authUsrService.login(this.f.username.value, this.f.password.value)
        // if(isSuccess) {
        //     this.msg = 'Logged in successfully!';;
        // } else {
        //     this.msg = 'An error occurred!';
        // }

        this.loading = false;
    }
}