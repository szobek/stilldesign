import {Component, OnInit} from '@angular/core';
import {Usermodel} from '../../../models/usermodel';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

    user: Usermodel;
    userForm: FormGroup;

    constructor(private router: Router,
                private active: ActivatedRoute,
                private userService: UserService, private formBuilder: FormBuilder) {



    }

    ngOnInit() {
        this.getUserDetail();
    }


    getUserDetail() {
        this.userService.getUserDetail(this.active.snapshot.params.id).subscribe(
            (user: any) => {
                this.user = user.data;
                this.createForm();
            },
            error => {
                console.log('something went wrong', error);
            },
            () => {
                console.log('call user detail success');
            }
        );
    }

    createForm() {
        this.userForm = this.formBuilder.group({
            firstName: new FormControl(`${this.user.firstName}`, [Validators.required, Validators.minLength(5)]),
            lastName: new FormControl(`${this.user.lastName}`, [Validators.required, Validators.minLength(5)]),
            phone: new FormControl(`${this.user.phone}`, [Validators.required, Validators.minLength(10)]),
            introduction: new FormControl((this.user.introduction.length) ? `${this.user.introduction[0].value}` : '', [Validators.required, Validators.minLength(5)]),
            position: new FormControl((this.user.position.length) ? `${this.user.position[0].value}` : '', [Validators.required, Validators.minLength(5)]),
            id: new FormControl(`${this.user.id}`, [Validators.required]),
            email: new FormControl(`${this.user.email}`, [Validators.required]),
        });
    }


    //deprecated....
    setFormValue() {



        /*
        Object.keys(this.user).forEach((key, index) => {
            if (this.userForm.controls.hasOwnProperty(key)) {
                this.userForm.controls[key].setValue(this.user[key]);
            }
        });

        */
        console.log('a form ', this.userForm.controls)

    }

    submitForm() {

        this.userService.loader$.next(true);
        this.userService.updateUserDetail(this.userForm.getRawValue()).subscribe(
            (success) => {
                console.log('user save success');
                this.router.navigate(['users']);
            },
            error => {
                console.log('something went wrong', error);
            },
            () => {
                this.userService.loader$.next(false);
                console.log('call user update success');
            }
        )
    }

}
