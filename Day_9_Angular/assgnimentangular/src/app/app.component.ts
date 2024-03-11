import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FavFoodComponent } from './fav-food/fav-food.component';
import { MessagefoodcomponentComponent } from './messagefoodcomponent/messagefoodcomponent.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    FavFoodComponent,
    MessagefoodcomponentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'My Favourite Food';
}
