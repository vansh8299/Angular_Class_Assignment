import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { client } from './client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, NgFor, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'form4template';

  roles = ['student', 'teacher'];

  clientModel = new client('', '', 5, '', '', '', '');

  error = true;

  roleassign(value: string) {
    if (value == 'default') {
      this.error = true;
    } else {
      this.error = false;
    }
  }
  OnSubmit() {
    console.log(this.clientModel);
  }
}
