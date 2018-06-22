import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login/login.component';
import {FormBuilder} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule
    ],
    providers: [FormBuilder],
    declarations: [LoginComponent, LogoutComponent]
})
export class LoginModule {

    constructor() {
        console.log('login constructor');
    }
}
