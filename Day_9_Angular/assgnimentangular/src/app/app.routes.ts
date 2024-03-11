import { Routes } from '@angular/router';
import { FavFoodComponent } from './fav-food/fav-food.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'FavFood', component: FavFoodComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
