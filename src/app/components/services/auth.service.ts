import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/internal/operators';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loginEndpoint: string;
    isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


    constructor(private http: HttpClient) {

        this.loginEndpoint = `${environment.apiEndpoint}/oauth/token`;



    }

    login() {
        this.http.post(this.loginEndpoint, environment.auth).pipe(map((res: any) => res.json())).subscribe();
    }

    logout() {

    }


}
