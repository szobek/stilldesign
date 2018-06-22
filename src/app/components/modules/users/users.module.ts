import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import {FormBuilder} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
    providers: [FormBuilder],
  declarations: [UserListComponent, UserDetailComponent, UserCardComponent, UserUpdateComponent]
})
export class UsersModule { }
