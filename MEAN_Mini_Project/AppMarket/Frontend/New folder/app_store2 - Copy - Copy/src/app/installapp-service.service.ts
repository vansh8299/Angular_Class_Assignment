import { Injectable } from '@angular/core';
import { AppInterface } from './appinterface';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InstallappServiceService {
  private Url = 'http://localhost:3000/download';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const token = localStorage.getItem('authToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }

  getdownload(): Observable<string[]> {
    return this.http
      .get<string[]>(this.Url, this.getHttpOptions())
      .pipe(catchError(this.handleError<string[]>('getdownload')));
  }

  addtodownload(id: string): Observable<AppInterface> {
    return this.http
      .post<AppInterface>(`${this.Url}/${id}`, '', this.getHttpOptions())
      .pipe(catchError(this.handleError<AppInterface>('addtodownload')));
  }
  deletedownload(id: string): Observable<string[]> {
    return this.http
      .delete<string[]>(`${this.Url}/${id}`, this.getHttpOptions())
      .pipe(catchError(this.handleError<string[]>('deletedownload')));
  }
}
