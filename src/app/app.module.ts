import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedModule} from './components/shared/shared/shared.module';
import { NavComponent } from './components/shared/nav/nav.component';
import {RouterModule} from '@angular/router';
import {LoginGuard} from './components/guards/login.guard';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthHttpInterceptor} from './components/interceptor/http.interceptor';
import {CollapseModule} from 'ngx-bootstrap';

export const routes = [
    {path: 'login', loadChildren: './components/modules/login/login.module#LoginModule'},
    {path: 'users', loadChildren: './components/modules/users/users.module#UsersModule'},
];

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
    ],
    imports: [
        BrowserModule,
        SharedModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        CollapseModule.forRoot(),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
