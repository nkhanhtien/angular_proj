import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/services';
import { AppConst } from '../common/const';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        // UnAuthenticated
        if (err.status === 401 && !window.location.href.endsWith('/login')) {
          // auto logout if 401 response returned from api
          // window.location.href = "/permission-error.html";
        }
        const error = err.error.message || err.statusText;
        return throwError(new Error(error));
      })
    );
  }
}

@Injectable()
export class AuthJwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  getLanguage() {
    let lang = localStorage.getItem(AppConst.LocalStorage.Language);
    if (lang) {
      return lang;
    }
    return '';
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authToken = this.auth.getAuthorizationToken();
    if (authToken) {
      // add authorization header with jwt token if available
      let authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
          Lang: this.getLanguage(),
        },
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }
}
