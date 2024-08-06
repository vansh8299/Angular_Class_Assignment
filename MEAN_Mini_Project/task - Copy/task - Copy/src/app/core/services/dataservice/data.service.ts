import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Task } from '../../../features/interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'api/task';

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

  get(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.url)
      .pipe(catchError(this.handleError<Task[]>('get', [])));
  }
  getdetail(id: number): Observable<Task> {
    const url1 = `${this.url}/${id}`;
    return this.http
      .get<Task>(url1)
      .pipe(catchError(this.handleError<Task>(`getdetail id=${id}`)));
  }

  add(task: Task): Observable<Task> {
    return this.http
      .post<Task>(this.url, task, this.httpOptions)
      .pipe(catchError(this.handleError<Task>('add')));
  }
  update(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.url}/tasks/${task.id}`, task);
  }

  delete(id: number): Observable<Task> {
    const url = `${this.url}/${id}`;
    return this.http
      .delete<Task>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Task>('delete')));
  }
}
