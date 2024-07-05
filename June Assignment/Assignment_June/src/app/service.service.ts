import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Userinterface } from './interface';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private Url = 'api/data';

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

  addItem(data: Userinterface): Observable<Userinterface> {
    return this.http
      .post<Userinterface>(this.Url, data, this.httpOptions)
      .pipe(catchError(this.handleError<Userinterface>('addItem')));
  }
}
