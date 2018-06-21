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

    constructor(private userService: UserService) {
        console.log('user list constructor');
    }


    users: Array<Usermodel> = [];

    ngOnInit() {

        this.userService.getUsers().subscribe(
            (result: any) => {
                console.log('a válasz: ', result);
                this.users = result.data;
            },
            error => {
                console.log('something went wrong...', error);
            },
            () => {
                console.log('complete users call');
            },
        );
    }


}
