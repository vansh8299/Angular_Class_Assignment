import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeriescomponentComponent } from './seriescomponent/seriescomponent.component';
import { DescriptioncomponentComponent } from './descriptioncomponent/descriptioncomponent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SeriescomponentComponent,
    DescriptioncomponentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Favourite Web Series';
}
