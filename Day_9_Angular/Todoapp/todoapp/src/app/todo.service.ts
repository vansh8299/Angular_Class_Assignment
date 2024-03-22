import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Todo } from './todo/todointerface';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoUrl = 'api/todos';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private message(messages: string) {
    this.messageService.add(`Service Message: ${messages}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
  gettodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl).pipe(
      tap((_) => this.message('Fetching Todos')),
      catchError(this.handleError<Todo[]>('gettodos', []))
    );
  }

  addtodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todoUrl, todo, this.httpOptions);
  }
  deletetodo(id: number): Observable<Todo> {
    const url = `${this.todoUrl}/${id}`;
    return this.http.delete<Todo>(url, this.httpOptions);
  }

  edittodo(todo: Todo): Observable<any> {
    return this.http.put(this.todoUrl, todo, this.httpOptions);
  }
}
