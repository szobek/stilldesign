import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    loginForm: FormGroup;

    constructor(private formbBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private userService: UserService
                ) {
    }

    ngOnInit() {
        this.loginForm = this.formbBuilder.group({
            name: new FormControl(''),
            password: new FormControl('')
        });

    }

    submitForm() {

        this.userService.loader$.next(true);
        this.authService.login(this.loginForm.value.name, this.loginForm.value.password).subscribe(
            (res: any) => {
                this.authService.collectTokenData(res);
                this.authService.isLogged$.next(true);
                this.router.navigate(['/users']);
            },
            error => {
                this.authService.logout();
                this.userService.loader$.next(false);
                if(error.status === 401)
                    alert('Hibás bejelentkezési adatok')
                console.log('error in login', error);
            },
            () => {
                this.userService.loader$.next(false);
                console.log('success login');
            }
        );

    }

}
