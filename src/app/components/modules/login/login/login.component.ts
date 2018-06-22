import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    loginForm: FormGroup;

    constructor(private formbBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.formbBuilder.group({
            name: new FormControl('dev@stilldesign.hu'),
            password: new FormControl('StillPass')
        });

    }

    submitForm() {

        this.authService.login(this.loginForm.value.name, this.loginForm.value.password).subscribe(
            (res: any) => {
                localStorage.token = res.access_token;
                localStorage.token_expires = `${new Date().getTime()} + ${parseInt(res.expires_in) * 1000}`;
                this.authService.isLogged$.next(true);
                this.router.navigate(['/users']);

                console.log('sikeres');
            },
            error => {
                console.log('something went wrong...', error);
                localStorage.clear();
                this.router.navigate(['/login']);

            },
            () => {
                console.log('success login');
            }
        );

    }

}
