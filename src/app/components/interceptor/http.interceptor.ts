import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>,
              next: HttpHandler,): Observable<HttpEvent<any>> {

        const newRequest = req.clone({
            headers: req.headers.set('Authorization', (localStorage.token) ? `Bearer ${localStorage.token}` : '' ),
        });


        return next.handle(newRequest);
    }
}

