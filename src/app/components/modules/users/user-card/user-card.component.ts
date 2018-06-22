import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

    user;

    @Input('user') set userData(param) {
        this.user = param;
    }

    constructor(private userService: UserService) {
    }

    ngOnInit() {

    }

    deleteUser(id) {
        this.userService.deleteUser(id).subscribe(res => console.log, error => console.log, () => console.log);
    }

}
