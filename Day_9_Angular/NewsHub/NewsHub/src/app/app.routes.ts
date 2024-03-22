import { Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { NewsdetailComponent } from './newsdetail/newsdetail.component';
import { CategoriesComponent } from './categories/categories.component';

export const routes: Routes = [
  { path: 'news', component: NewsComponent },
  { path: 'detail/:id', component: NewsdetailComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: '', redirectTo: 'news', pathMatch: 'full' },
];
