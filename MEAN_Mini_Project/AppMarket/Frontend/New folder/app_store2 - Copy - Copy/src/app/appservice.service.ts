import { Injectable } from '@angular/core';
import { AppInterface } from './appinterface';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppserviceService {
  private appUrl = 'http://localhost:3000/applications';

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

  getapp(): Observable<AppInterface[]> {
    return this.http
      .get<AppInterface[]>(this.appUrl, this.getHttpOptions())
      .pipe(catchError(this.handleError<AppInterface[]>('getapp', [])));
  }

  getappdetail(id1: string): Observable<AppInterface> {
    const url = `${this.appUrl}/${id1}`;
    return this.http
      .get<AppInterface>(url, this.getHttpOptions())
      .pipe(
        catchError(this.handleError<AppInterface>(`getappdetail id=${id1}`))
      );
  }

  addapp(app: AppInterface): Observable<AppInterface> {
    // const token = localStorage.getItem('authToken');
    // console.log(`Bearer ${token}`);
    return this.http
      .post<AppInterface>(this.appUrl, app, this.getHttpOptions())
      .pipe(catchError(this.handleError<AppInterface>('addapp')));
  }

  deleteapp(id: number): Observable<AppInterface> {
    const url = `${this.appUrl}/${id}`;
    return this.http
      .delete<AppInterface>(url, this.getHttpOptions())
      .pipe(catchError(this.handleError<AppInterface>('deleteapp')));
  }

  updateapp(app: AppInterface): Observable<any> {
    const url = `${this.appUrl}/${app.id}`;
    return this.http
      .put(url, app, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('updateapp')));
  }
}
