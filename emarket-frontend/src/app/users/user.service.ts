// import { EventEmitter, Injectable } from "@angular/core";
// import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthUsrService } from "../authUsr/authUsr.service";
import { User } from "./user.model";

@Injectable()
// @Injectable({ providedIn: 'root' })
export class UserService {
    // isItemClicked = new EventEmitter<boolean>();;
    // productsChanged = new Subject<User[]>();
    // private products: Product[] = [];

    constructor(
        private http: HttpClient,
        private authUsrService: AuthUsrService,
    ) {
    }

    private users: User[] = [];

    getUsers() {
        return this.users.slice();
    }

    getUser(index: number) {
        return this.users[index];
    }

    setCurrentUserName() {

    }

    getUserById(id: number) {
        return this.http.get<User>(`/api1/openapi/v1/user?id=` + id);
    }

    update(id: number, params: any) {
        // return this.http.put(`${environment.apiUrl}/user/${id}`, params)
        // return this.http.put(`/api1/openapi/v1/user?id=` + id, params)
        return this.http.post(`/api1/openapi/v1/user?id=` + id, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.authUsrService.userValue.id) {
                    // update local storage
                    const user = { ...this.authUsrService.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.authUsrService.userValue.next(user);
                }
                return x;
            }));
    }

    delete(id: number) {
        // return this.http.delete(`${environment.apiUrl}/user/${id}`)
        return this.http.delete(`/api1/openapi/v1/user?id=` + id)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.authUsrService.userValue.id) {
                    this.authUsrService.logout();
                }
                return x;
            }));
    }

    create(user: User) {
        return this.http.post(`/api1/openapi/v1/user`, user);
    }

}