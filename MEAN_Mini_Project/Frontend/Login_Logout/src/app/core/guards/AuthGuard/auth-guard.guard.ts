import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('authenticationToken');
  const refreshToken = cookieService.get('refreshToken');
  if (token || refreshToken) {
    return true;
  } else {
    return false;
  }
};
