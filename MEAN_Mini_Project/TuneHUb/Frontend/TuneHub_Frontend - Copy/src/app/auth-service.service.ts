import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private apiUrl = 'https://tunehub-backend-b1ap.onrender.com/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string, role: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password, role })
      .pipe(
        tap((response) => {
          console.log('Login response:', response); // Log the response
          if (response) {
            localStorage.setItem('authToken', response);
            console.log('Token stored in localStorage:', response.token); // Log the token
          } else {
            console.error('No token found in response:', response);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error); // Log the error
          return throwError(error); // Rethrow the error
        })
      );
  }

  register(email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      email,
      password,
      role,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
