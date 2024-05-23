import { Injectable } from '@angular/core';
import { AppInterface } from './appinterface';
import { Observable, catchError, of, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppserviceService {
  private appUrl = 'api/AppDetailarr';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
  getapp(): Observable<AppInterface[]> {
    return this.http
      .get<AppInterface[]>(this.appUrl)
      .pipe(catchError(this.handleError<AppInterface[]>('getapp', [])));
  }

  getappdetail(id1: number): Observable<AppInterface> {
    const url = `${this.appUrl}/${id1}`;
    return this.http
      .get<AppInterface>(url)
      .pipe(
        catchError(this.handleError<AppInterface>(`getappdetail id=${id1}`))
      );
  }
  addapp(app: AppInterface): Observable<AppInterface> {
    return this.http
      .post<AppInterface>(this.appUrl, app, this.httpOptions)
      .pipe(catchError(this.handleError<AppInterface>('addapp')));
  }
  deleteapp(id: number): Observable<AppInterface> {
    const url = `${this.appUrl}/${id}`;
    return this.http
      .delete<AppInterface>(url, this.httpOptions)
      .pipe(catchError(this.handleError<AppInterface>('deleteapp')));
  }
  updateapp(app: AppInterface): Observable<any> {
    const url = `${this.appUrl}/${app.id}`;
    return this.http
      .put(url, app, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateapp')));
  }
}
