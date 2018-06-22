import {Injectable} from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {


    userEndpoint: string;
    loader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
        this.userEndpoint = `${environment.apiEndpoint}/admin/user`;
    }


    getUsers() {
        return this.http.get(this.userEndpoint).pipe(map((res: any) => res));
    }

    getUserDetail(id) {
        return this.http.get(`${this.userEndpoint}/${id}`).pipe(map((res: any) => res));
    }

    updateUserDetail(user) {
        user.name = `${user.firstName} ${user.lastName}`;
        user.active = true;
        return this.http.put(`${this.userEndpoint}/${user.id}`, user).pipe(map((res: any) => res));
    }
}
