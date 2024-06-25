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

  getallinstallapps(): Observable<any> {
    return this.http
      .get(this.Url, this.getHttpOptions())
      .pipe(catchError(this.handleError('getapp', [])));
  }

  addapptoinstall(appId: string): Observable<any> {
    const body = { appId: appId }; // Wrap the id in an object
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Ensure the content type is set to JSON
      }),
    };
    return this.http
      .post(this.Url, body, httpOptions)
      .pipe(catchError(this.handleError('addapptoinstall')));
  }
  deleteappfrominstall(id: string): Observable<any> {
    const url = `${this.Url}/${id}`;
    return this.http
      .delete(url, this.getHttpOptions())
      .pipe(catchError(this.handleError('deleteapp')));
  }
}
