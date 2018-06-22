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
    refreshPayload;


    constructor(private http: HttpClient, private router: Router) {
        this.loginEndpoint = `${environment.apiEndpoint}/oauth/token`;
        this.authPayload = environment.token;
        this.refreshPayload = environment.refresh;
    }

    login(userName, password) {
        this.authPayload.username = userName;
        this.authPayload.password = password;
        return this.http.post(this.loginEndpoint, this.authPayload);
    }

    refreshToken() {
        this.refreshPayload.refresh_token = localStorage.refreshToken;
        return this.http.post(this.loginEndpoint, this.refreshPayload);
    }

    logout() {
        this.isLogged$.next(false);
        localStorage.clear();
        this.router.navigate(['login']);
    }

    collectTokenData(res) {
        localStorage.token = res.access_token;
        localStorage.token_expires = new Date().getTime() + parseInt(res.expires_in) * 1000;
        localStorage.refreshToken = res.refresh_token;
    }

    checkExpiredToken() {
        const now = new Date().getTime();
        const expire = (localStorage.token_expires) ? localStorage.token_expires : 0;

        if(localStorage.token && localStorage.token_expires && localStorage.refreshToken) {
            if (now < expire) { // még jó
                this.isLogged$.next(true);
            } else {
                if (localStorage.refreshToken) { // ha van refresh token
                    this.refreshToken().subscribe(
                        (res: any) => {
                            console.log('sikeres refresh', res);
                            this.collectTokenData(res);
                        },
                        error => {
                            console.log('error', error);
                        },
                        () => {
                            console.log('success refresh');
                        });
                } else { // nincs refresh token
                    this.router.navigate(['/login']);
                }
            }
        } else {
            this.logout();

        }

    }


}
