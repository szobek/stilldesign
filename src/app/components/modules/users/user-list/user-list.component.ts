import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {Usermodel} from '../../../models/usermodel';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {


    pagination;

    constructor(private userService: UserService) {
        console.log('user list constructor');
    }


    users: Array<Usermodel> = [];

    ngOnInit() {
        this.getUsers();
    }

    getUsers(url?: string) {
        this.userService.getUsers((url) ? url : null).subscribe(
            (result: any) => {
                console.log('a válasz: ', result);
                this.users = result.data;
                this.pagination = result.meta.pagination;
            },
            error => {
                console.log('something went wrong...', error);
            },
            () => {
                console.log('complete users call');
            },
        );
    }

    setPage(url) {
        console.log('set page', url)
        this.getUsers(url);
    }


}
