import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserCardComponent} from './user-card/user-card.component';
import {UserUpdateComponent} from './user-update/user-update.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CreateUserComponent} from './create-user/create-user.component';
import {PaginationComponent} from '../../shared/pagination/pagination.component';
import {SharedModule} from '../../shared/shared/shared.module';
import {DeleteUserComponent} from './delete-user/delete-user.component';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
    providers: [FormBuilder],
    declarations: [
        UserListComponent,
        UserDetailComponent,
        UserCardComponent,
        UserUpdateComponent,
        CreateUserComponent,
        DeleteUserComponent,
    ]
})
export class UsersModule {
}
