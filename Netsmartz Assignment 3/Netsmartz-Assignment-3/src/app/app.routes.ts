import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemdetailComponent } from './itemdetail/itemdetail.component';
import { AdditemComponent } from './additem/additem.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },

  { path: 'itemdetail/:id', component: ItemdetailComponent },
  { path: 'additem', component: AdditemComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
];
