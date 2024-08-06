import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { appInterface } from '../../features/appinterface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  private url = environment.apiUrl;

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

  get(): Observable<appInterface[]> {
    return this.http
      .get<appInterface[]>(this.url)
      .pipe(catchError(this.handleError<appInterface[]>('get', [])));
  }

  getdetail(id1: number): Observable<appInterface> {
    const url1 = `${this.url}/${id1}`;
    return this.http
      .get<appInterface>(url1)
      .pipe(catchError(this.handleError<appInterface>(`getdetail id=${id1}`)));
  }
  update(app: appInterface): Observable<any> {
    return this.http
      .put(this.url, app, this.httpOptions)
      .pipe(catchError(this.handleError<appInterface>('update')));
  }
  add(app: appInterface): Observable<appInterface> {
    return this.http
      .post<appInterface>(this.url, app, this.httpOptions)
      .pipe(catchError(this.handleError<appInterface>('add')));
  }

  delete(id: number): Observable<appInterface> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<appInterface>(url, this.httpOptions)
      .pipe(catchError(this.handleError<appInterface>('delete')));
  }
  search(word: string): Observable<appInterface[]> {
    if (!word.trim()) {
      return of([]);
    }
    return this.http
      .get<appInterface[]>(`${this.url}/?name=${word}`)
      .pipe(catchError(this.handleError<appInterface[]>('search', [])));
  }
}
