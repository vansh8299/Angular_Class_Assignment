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

  clientModel = new client(
    'Vansh',
    'vansh@gmail.com',
    88899556622,
    '',
    'weekdays',
    true
  );
}
