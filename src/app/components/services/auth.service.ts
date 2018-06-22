import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/internal/operators';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loginEndpoint: string;
    isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    authPayload;


    constructor(private http: HttpClient, private router: Router) {
        this.loginEndpoint = `${environment.apiEndpoint}/oauth/token`;
        this.authPayload = environment.auth;
    }

    login(userName, password) {
        this.authPayload.username = userName;
        this.authPayload.password = password;
        return this.http.post(this.loginEndpoint, environment.auth);
    }

    logout() {
        this.isLogged$.next(false);
        localStorage.clear();
        this.router.navigate(['login']);
    }


}
