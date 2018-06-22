import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

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

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {

    }

    deleteUser(id) {
        if(confirm('Valóban törli?')) {
            this.userService.loader$.next(true);
            this.userService.deleteUser(id)
                .subscribe(
                    (deleted: any) => {
                        console.log('delete successfull', deleted);
                        this.userService.loader$.next(false);
                        this.router.navigate(['/users']);

                    },
                    error => {
                        this.userService.loader$.next(false);
                        console.log('something went wrong...', error);
                    },
                    () => {
                        console.log('complete delete')
                    }
                );
        }

    }

}
