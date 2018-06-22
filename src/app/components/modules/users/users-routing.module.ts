import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UserUpdateComponent} from './user-update/user-update.component';
import {CreateUserComponent} from './create-user/create-user.component';

const routes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: UserListComponent},
    {path: 'detail', component: UserDetailComponent},
    {path: 'update', component: UserUpdateComponent},
    {path: 'create', component: CreateUserComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
