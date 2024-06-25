import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { iteminterface } from './iteminterface';

@Injectable({
  providedIn: 'root',
})
export class ItemserviceService {
  private url = 'api/items';
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
  getItems(): Observable<iteminterface[]> {
    return this.http
      .get<iteminterface[]>(this.url)
      .pipe(catchError(this.handleError<iteminterface[]>('getItems', [])));
  }

  getItemdetail(id: number): Observable<iteminterface> {
    const itemurl = `${this.url}/${id}`;
    return this.http
      .get<iteminterface>(itemurl)
      .pipe(
        catchError(this.handleError<iteminterface>(`getitemdetail id=${id}`))
      );
  }
  additem(item: iteminterface): Observable<iteminterface> {
    return this.http
      .post<iteminterface>(this.url, item, this.httpOptions)
      .pipe(catchError(this.handleError<iteminterface>('additem')));
  }
}
