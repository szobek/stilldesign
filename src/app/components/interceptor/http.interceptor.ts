import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler,): Observable<HttpEvent<any>> {


        const newRequest = req.clone({
            headers: (localStorage.token) ? req.headers.set('Authorization', `Bearer ${localStorage.token}`) : req.headers.delete('Authorization'),
        });

        return next.handle(newRequest);
    }
}

