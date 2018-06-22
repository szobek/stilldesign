import {Injectable} from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {


    userEndpoint: string;

    constructor(private http: HttpClient) {
        this.userEndpoint = `${environment.apiEndpoint}/admin/user`;
    }


    getUsers() {
        return this.http.get(this.userEndpoint).pipe(map((res: any) => res));
    }

    getUserDetail(id) {
        return this.http.get(`${this.userEndpoint}/${id}`).pipe(map((res: any) => res));
    }
}
