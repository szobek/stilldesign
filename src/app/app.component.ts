import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './components/services/user.service';
import {AuthService} from './components/services/auth.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnDestroy{


    loader: boolean;
    loaderSubscribe;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) {

        router.events.subscribe(
            (res) => {
                if (res instanceof NavigationStart) {
                    if(res.url !== '/login' && res.url !== '/about' && res.url !== '/' ) {
                        this.authService.checkExpiredToken();
                    }

                }
            }
        );


        this.loaderSubscribe = this.userService.loader$.subscribe(bool => {
            this.loader = bool;
        });




    }

    ngOnDestroy(): void {
        this.loaderSubscribe.unsubscribe();
    }





}
