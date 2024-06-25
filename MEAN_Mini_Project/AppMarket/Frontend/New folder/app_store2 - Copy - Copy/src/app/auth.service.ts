import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string, role: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password, role })
      .pipe(
        tap((response) => {
          if (response && response.token) {
            localStorage.setItem('authToken', response.token);
          }
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
