import { Routes } from '@angular/router';
import { FavFoodComponent } from './fav-food/fav-food.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FoodDetailsComponent } from './food-details/food-details.component';

export const routes: Routes = [
  { path: 'FavFood', component: FavFoodComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:rank', component: FoodDetailsComponent },
];
