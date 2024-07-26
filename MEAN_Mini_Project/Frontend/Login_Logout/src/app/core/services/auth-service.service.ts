import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError, map } from 'rxjs';
import { User } from '../../userInterface';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(
    username: string,
    password: string
  ): Observable<[string, string, User]> {
    return this.http
      .post<[string, string, User]>(`${this.apiUrl}/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          const [token, refreshToken, user] = response;

          if (token && refreshToken) {
            this.cookieService.set('authenticationToken', token);
            this.cookieService.set('refreshToken', refreshToken);
            console.log('Tokens and refreshToken', token, refreshToken, user);
          } else {
            console.error('No tokens ', response);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error);
          return throwError(() => new Error(error.message));
        })
      );
  }
  register(
    username: string,
    email: string,
    password: string
  ): Observable<User> {
    return this.http
      .post<User>(`${this.apiUrl}/register`, { username, email, password })
      .pipe(
        tap((user) => {
          console.log('User registered:', user);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Registration error:', error);
          return throwError(() => new Error(error.message));
        })
      );
  }

  refreshToken(): Observable<string> {
    const refreshToken = this.cookieService.get('refreshToken');
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/refresh-token`, { refreshToken })
      .pipe(
        map((response) => response.token),
        tap((token) => {
          this.cookieService.set('authenticationToken', token);
          console.log('New token', token);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);
          return throwError(() => new Error(error.message));
        })
      );
  }
  getapp(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/dashboard`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching dummy:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getToken(): string | null {
    return this.cookieService.get('authenticationToken');
  }

  getRefreshToken(): string | null {
    return this.cookieService.get('refreshToken');
  }

  logout(): void {
    this.cookieService.delete('authenticationToken');
    this.cookieService.delete('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.cookieService.get('authenticationToken');
  }
}
