import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo/todointerface';

@Injectable({
  providedIn: 'root',
})
export class InmemoryserviceService implements InMemoryDbService {
  createDb() {
    const todos = [
      {
        id: 1,
        task: 'Brush',
        isCompleted: true,
      },
      {
        id: 2,
        task: 'Bath',
        isCompleted: true,
      },
      {
        id: 3,
        task: 'Cleaning',
        isCompleted: false,
      },
    ];
    return { todos };
  }
  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
  }
}
