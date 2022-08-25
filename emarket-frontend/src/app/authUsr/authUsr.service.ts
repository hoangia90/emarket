import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { delay, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../users/user.model";
import { UserService } from "../users/user.service";

@Injectable({ providedIn: 'root' })
export class AuthUsrService implements OnInit {

    private userSubject: BehaviorSubject<any>;
    public userObservable: Observable<any>;
    nullUser = null;
    
    userKey = 'user';
    users: User[] = [];


    constructor(
        private router: Router,
        private http: HttpClient,
        // private userService: UserService
    ) {
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        // this.user = this.userSubject.asObservable();
        let userData;
        if (localStorage.getItem("user") !== null) {
            userData = JSON.parse(localStorage.getItem('user') || '');
        } else {
            userData = this.nullUser;
        }
        this.userSubject = new BehaviorSubject<User>(userData);
        this.userObservable = this.userSubject.asObservable();

        if (localStorage.getItem('users') !== null) {
            this.users = JSON.parse(localStorage.getItem('users') || '');
        }
    }
    ngOnInit(): void {
        // this.currentUserName = 'abc';
        // this.currentPassword = '';

        // if (localStorage.getItem('users') !== null) {

        //     this.users = JSON.parse(localStorage.getItem('users') || '');
        // }
    }

    // currentUser!: User;
    // nullUser = new User('', '', []);
    // currentUserSubject = new BehaviorSubject<User>(this.nullUser);



    // constructor(private userService: UserService, private http: HttpClient, private router: Router) {
    // }


    // autoLogin() {
    //     let userData!: User;
    //     if (localStorage.getItem("userData") !== null) {
    //         userData = JSON.parse(localStorage.getItem('userData') || '');
    //         const loaderUser = new User(userData.id, userData.password, userData.contract);
    //         this.currentUser = loaderUser;
    //         this.currentUserSubject.next(loaderUser);
    //     } else {
    //         userData = this.nullUser;
    //     }
    // }

    // logout() {
    //     this.currentUserSubject.next(this.nullUser);
    //     this.router.navigate(['/AuthUsrComponent']);
    //     localStorage.removeItem('userData');
    //     // if (this.tokenExpirationTimer) {
    //     //     clearTimeout(this.tokenExpirationTimer);
    //     // }
    //     // this.tokenExpirationTimer = null;
    // }

    // login(userName: string, password: string): boolean {
    //     let isAuthenticated = false;
    //     // let i = 0;
    //     for (let u = 0; u < this.userService.getUsers().length; u++) {
    //         console.log(this.userService.getUser(u).id + ' ' + this.userService.getUser(u).password);

    //         if (this.userService.getUser(u).id == userName && this.userService.getUser(u).password == password) {
    //             isAuthenticated = true;
    //             // i = u;
    //             // console.log('alloooo');

    //             this.currentUser = this.userService.getUser(u);

    //             localStorage.setItem('userData', JSON.stringify(this.userService.getUser(u)));

    //             this.currentUserSubject.next(this.userService.getUser(u));

    //         }
    //     }

    //     if (isAuthenticated === false) {
    //         this.currentUserSubject.next(this.nullUser);
    //         // this.router.navigate(['/AuthUsrComponent']);
    //         localStorage.removeItem('userData');
    //     }

    //     // if (isAuthenticated) {
    //     //     this.currentUser =  this.userService.getUser(i);
    //     //     localStorage.setItem('userData', JSON.stringify(this.currentUser));
    //     // }
    //     console.log(isAuthenticated);

    //     return isAuthenticated;
    // }

    // getCurrentUser() {
    //     return this.currentUser;
    // }

    ////////

    public get userValue(): any {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        // let reqUser = new User('', username, password, '', '', '', '', '', '', '', '', '');
        let reqUser = new User(-1, username, password, '', '');
        console.log('reqUser', reqUser.username + "+" + reqUser.password);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }),
        };

        return this.http.post<User>(`/api1/openapi/v1/user/authenticate`, reqUser, httpOptions)
            .pipe(map(return_user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(return_user));
                this.userSubject.next(return_user);
                console.log("returned user!!!!", return_user);
                return return_user;
            }));

        // .subscribe(response => {
        //     console.log("response@!!!!!!", response)
        // });

        // let user = this.authenticate(username, password)
        // if (user) {
        //     localStorage.setItem('user', JSON.stringify(user));
        //     this.userSubject.next(user);
        //     // console.log("[debug] - authUsr",user);
        //     // return true;
        // } else {
        //     user = null;
        //     // return false
        // }
        // return user;


        //   let isAuthenticated = false;
        // let i = 0;
        // for (let u = 0; u < this.getAll().length; u++) {
        //     console.log(this.userService.getUser(u).id + ' ' + this.userService.getUser(u).password);

        //     if (this.userService.getUser(u).id == username && this.userService.getUser(u).password == password) {
        //         isAuthenticated = true;
        //         // i = u;
        //         // console.log('alloooo');

        //         this.currentUser = this.userService.getUser(u);

        //         localStorage.setItem('userData', JSON.stringify(this.userService.getUser(u)));

        //         this.currentUserSubject.next(this.userService.getUser(u));
        //     }

        // }
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        // this.userSubject.next(null);
        this.userSubject.next(this.nullUser);
        this.router.navigate(['../userAuthenticate']);
    }

    register(user: User) {
        // return this.http.post(`${environment.apiUrl}/users/register`, user);
        return this.http.post(`/api1/openapi/v1/user`, user);
        // http://localhost:9292/openapi/v1/user
    }

    getAll() {
        // return this.http.get<User[]>(`${environment.apiUrl}/users`);
        // if (!isLoggedIn()) return unauthorized();
        // return ok(this.users.map(x => this.basicDetails(x)));
        // return this.users.map(x => this.basicDetails(x));

        // return this.users.map(x => this.basicDetails(x));
        // return this.users;

        // this.users = this.http.get<User[]>(`/api1/openapi/v1/basicusers`);
        return this.http.get<User[]>(`/api1/openapi/v1/basicusers`);
    }

    // basicDetails(user: User) {
    //     if (user) {
    //         const { id, username, firstName, lastName } = user;
    //         return { id, username, firstName, lastName };
    //     } else {
    //         // const { id, username, firstName, lastName } = this.nullUser;
    //         // return { id, username, firstName, lastName };
    //         return null;
    //     }

    // }

    // ok(body?: any) {
    //     return of(new HttpResponse({ status: 200, body }))
    //         .pipe(delay(500)); // delay observable to simulate server api call
    // }

}


