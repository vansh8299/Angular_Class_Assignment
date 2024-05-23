import { Routes } from '@angular/router';
import { UpdateComponent } from './update/update.component';
import { CreateformComponent } from './createform/createform.component';

export const routes: Routes = [
  {
    path: 'create',
    component: CreateformComponent,
  },
  {
    path: 'update',
    component: UpdateComponent,
  },
];
