import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { client } from './client';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  tasks = [
    'Components',
    'Dependency Injection',
    'Directives',
    'Pipes',
    'Routing and Naving',
  ];

  taskHasError = true;

  clientModel = new client(
    '',
    'vansh@gmail.com',
    78945618233,
    '',
    'weekdays',
    true
  );

  validateTask(value: string) {
    if (value === 'default') {
      this.taskHasError = true;
    } else {
      this.taskHasError = false;
    }
  }

  onSubmit() {
    console.log(this.clientModel);
  }
}
