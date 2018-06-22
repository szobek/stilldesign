import {Component} from '@angular/core';
import {UserService} from './components/services/user.service';
import {AuthService} from './components/services/auth.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    loader: boolean = false;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) {
        this.userService.loader$.subscribe(bool => {
            this.loader = bool;
        });
        router.events.subscribe(
            (res) => {
                if (res instanceof NavigationStart) {
                    console.log('res', res, res.url);
                    if(res.url !== '/login') {
                        this.authService.checkExpiredToken();
                    }

                }
            }
        );

    }


}
