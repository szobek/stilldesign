import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-delete-user',
    templateUrl: './delete-user.component.html',
    styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

    userId: number;

    constructor(private userService: UserService, private router: Router, private active: ActivatedRoute) {
        this.userId = this.active.snapshot.params.id;
    }

    ngOnInit() {
        console.log('start delete', this.userId);
        this.deleteUser(this.userId);
    }


    deleteUser(id) {
        if (confirm('Valóban törli?')) {
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
                        console.log('complete delete');
                    }
                );
        } else {
            this.router.navigate(['/users']);
        }

    }

}
