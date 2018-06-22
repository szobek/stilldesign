import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {Usermodel} from '../../../models/usermodel';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

    user: Usermodel;

    constructor(private route: Router,
                private active: ActivatedRoute,
                private userService: UserService) {
    }

    ngOnInit() {
        this.getUserDetail();
    }

    getUserDetail() {
        this.userService.getUserDetail(this.active.snapshot.params.id).subscribe(
            (user: any) => {
                this.user = user.data;
            },
            error => {
                console.log('something went wrong', error);
            },
            () => {
                console.log('call user detail success');
            }
            );
    }

}
