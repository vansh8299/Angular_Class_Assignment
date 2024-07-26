import { Component, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { signal } from '@angular/core';
import { Todo } from './interface';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'signals';
  count = signal<number>(0);
  todos = signal<Todo[]>([]);
  newTodoText = signal<string>('');

  total = computed(() => this.todos().length); // whenerver there is any change in todos array computed will trigger and update the value

  constructor() {
    effect(() => {
      const items = this.todos().length;
      const even = items % 2 == 0;
      console.log(`Items are: ${even ? 'Even' : 'Odd'}`);
      // we can use it for api calling
    });
  }
  ngOnInit(): void {
    console.log(this.count());
  }
  handleInput(event: Event) {
    const input = event?.target as HTMLInputElement;
    this.newTodoText.set(input?.value);
  }

  addTodo() {
    if (this.newTodoText().trim().length) {
      const newTodo: Todo = {
        id: Date.now(),
        text: this.newTodoText(),
        done: false,
      };
      this.todos.set([...this.todos(), newTodo]);
      this.newTodoText.set('');
    }
  }

  deleteTodo(id: number) {
    const updatedTodos = this.todos().filter((todo) => todo.id !== id);
    this.todos.set(updatedTodos);
  }
}
