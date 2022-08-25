import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/alert/alert.service';
import { AuthUsrService } from 'src/app/authUsr/authUsr.service';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    form!: FormGroup;
    //   id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;

    id!: number;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        // private accountService: AuthUsrService,
        private alertService: AlertService,
        private userService: UserService,
    ) { }

    ngOnInit() {
        //   this.id = this.route.snapshot.params['id'];
        //   this.isAddMode = !this.id;

        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                    //   this.editMode = params['id'] != null;
                    this.isAddMode = params['id'] == null;
                }
            );

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
            // this.id = +this.id;
        }

        this.form = this.formBuilder.group({
            id: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', passwordValidators]
        });

        if (!this.isAddMode) {
            this.userService.getUserById(this.id)
                .pipe(first())
                .subscribe(
                    (x: { [key: string]: any; }) => {
                        this.form.patchValue(x)
                    });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.userService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: (error: string) => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateUser() {
        this.userService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: (error: string) => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

}