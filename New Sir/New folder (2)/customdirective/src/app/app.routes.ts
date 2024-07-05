import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'dialog',
    loadComponent: () =>
      import('./dialog/dialog.component').then((m) => m.DialogComponent),
    canActivate: [authGuard],
  },
];
