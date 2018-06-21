import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {


    isCollapsed = true;

    isLogged: boolean;
    loginSubscribe;

    @HostListener('document:click', ['$event'])
    preventEmptyHrefNav(event: any) {
        let isCollapseButton = false;
        event.path.map(dom => {
            if (dom.classList && dom.classList[0] === 'navbar-toggler') isCollapseButton = true;
        });
        if (!isCollapseButton) this.isCollapsed = true;

    }

    constructor(private authService: AuthService) {
        this.loginSubscribe = this.authService.isLogged$.subscribe(logged => this.isLogged = logged);
    }


    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.loginSubscribe.unsubscribe();
    }


}
