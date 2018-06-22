import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {

      this.userForm = this.formBuilder.group({
          // firstName: new FormControl('Jonathan', [Validators.required, Validators.minLength(5)]),
          // lastName: new FormControl('Michael', [Validators.required, Validators.minLength(5)]),
          // phone: new FormControl('0620123456789', [Validators.required, Validators.minLength(10)]),
          // introduction: new FormControl('ez a leírása a usernek', [Validators.required, Validators.minLength(5)]),
          // position: new FormControl('sütő a napnál', [Validators.required, Validators.minLength(5)]),
          email: new FormControl(`foo${new Date().getTime()}@example.com`, [Validators.required]),
          password: new FormControl('123456789', [Validators.required]),
          // password_confirmation: new FormControl('123456789', [Validators.required]),
      });
  }

  ngOnInit() {
  }

    submitForm() {
      console.log('save', this.userForm);
      this.userService.createUser(this.userForm.getRawValue()).subscribe(
          res => console.log,
          error => console.log,
          () => console.log,
      );
    }

}
