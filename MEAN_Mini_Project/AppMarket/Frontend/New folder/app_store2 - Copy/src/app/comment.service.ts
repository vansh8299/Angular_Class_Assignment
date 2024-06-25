import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { commentInterface } from './commentInterface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const authToken = localStorage.getItem('authToken');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }),
    };
  }
  getCommentsByAppId(id: string): Observable<commentInterface[]> {
    const url = `${this.url}/comment/${id}`;
    return this.http.get<commentInterface[]>(url, this.getHttpOptions());
  }

  addComment(commentData: {
    statement: string;
    rating: string;
    appId: string;
  }): Observable<any> {
    const url = `${this.url}/comment/${commentData.appId}`;
    return this.http
      .post(url, commentData, this.getHttpOptions())
      .pipe(catchError(this.handleError<any>('addComment')));
  }
  deleteComment(commentId: string): Observable<any> {
    const deleteurl = `${this.url}/comment/${commentId}`;
    return this.http.delete<any>(deleteurl, this.getHttpOptions());
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
