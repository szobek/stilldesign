import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';
import {PasswordValidation} from '../password-validation';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

    userForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {

        this.userForm = this.formBuilder.group({
            firstName: new FormControl(`${this.lorem(1)}`, [Validators.required, Validators.minLength(5)]),
            lastName: new FormControl(`${this.lorem(1)}`, [Validators.required, Validators.minLength(5)]),
            phone: new FormControl('0620123456789', [Validators.required, Validators.minLength(10)]),
            introduction: new FormControl(`${this.lorem(5)}`, [Validators.required, Validators.minLength(5)]),
            position: new FormControl(`${this.lorem(2)}`, [Validators.required, Validators.minLength(5)]),
            email: new FormControl(`foo${new Date().getTime()}@example.com`, [Validators.required, Validators.email, Validators.minLength(10)]),
            password: new FormControl('12345678910', [Validators.required, Validators.minLength(10)]),
            password_confirmation: new FormControl('12345678910', [Validators.required, Validators.minLength(10)]),
        },{
            validator: PasswordValidation.MatchPassword
        });
    }

    ngOnInit() {
    }

    lorem(num) {
        let text = '';
        for (let n of Array(num)) {
            text += `${ environment.lorem[Math.floor(Math.random() * (environment.lorem.length - 1))]}`;
        }
        return text;

    }

    submitForm() {

        if(!this.userForm.valid) {
            alert('Hibás form adatok, kérem javítsa');
            return false;
        }

        this.userService.loader$.next(true);
        this.userService.createUser(this.userForm.getRawValue()).subscribe(
            res => {
                this.userService.loader$.next(false);
                this.router.navigate(['users']);
            },
            error => {
                const errors = error.error.errors;
                Object.keys(errors).forEach(err => console.log(err, ...errors[err]));
                this.userService.loader$.next(false);

            },
            () => console.log,
        );
    }

    changeForm() {
        console.log(this.userForm)
    }

}
