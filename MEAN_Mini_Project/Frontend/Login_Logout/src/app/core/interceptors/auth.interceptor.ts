import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  const cookieService = inject(CookieService);
  let auth = req;

  const token = authService.getToken();
  if (token) {
    auth = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(auth).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && authService.getRefreshToken()) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            cookieService.set('authenticationToken', newToken);
            const newAuth = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });
            return next(newAuth);
          }),
          catchError((refreshError) => {
            console.error('Error:', refreshError);
            authService.logout();
            return throwError(() => new Error('Unable to refresh token'));
          })
        );
      }
      return throwError(() => error);
    })
  );
};
