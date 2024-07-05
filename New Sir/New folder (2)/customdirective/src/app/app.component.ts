import { Component } from '@angular/core';
import { CustomDirective } from './custom.directive';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CustomPipePipe } from './custom-pipe.pipe';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CustomDirective, CustomPipePipe, RouterOutlet, RouterModule], // Import the directive
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'customdirective';
}
