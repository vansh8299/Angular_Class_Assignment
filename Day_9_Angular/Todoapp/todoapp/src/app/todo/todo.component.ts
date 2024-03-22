import { Component } from '@angular/core';
import { Todo } from './todointerface';
import { TodoService } from '../todo.service';
import { NgFor } from '@angular/common';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgFor, FormsModule, NgClass],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todos: Todo[] = [];

  constructor(private todoService: TodoService, private location: Location) {}

  ngOnInit(): void {
    this.getTodos();
  }
  getTodos(): void {
    this.todoService.gettodos().subscribe((todo) => (this.todos = todo));
  }

  goBack(): void {
    this.location.back();
  }

  add(task: string): void {
    task = task.trim();
    if (!task) {
      return;
    }
    this.todoService
      .addtodo({ task } as Todo)
      .subscribe((t) => this.todos.push(t));
  }
  delete(todo: Todo): void {
    this.todos = this.todos.filter((t) => t != todo);
    this.todoService.deletetodo(todo.id).subscribe();
  }
  edit(todo: Todo): void {
    this.todoService.edittodo(todo).subscribe(() => this.goBack());
  }
}
