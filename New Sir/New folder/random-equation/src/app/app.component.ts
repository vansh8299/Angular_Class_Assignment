import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EquationCheckComponent } from './equation-check/equation-check.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EquationCheckComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'random-equation';
}
