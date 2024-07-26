import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./shared/components/createapp/createapp.component').then(
        (m) => m.CreateappComponent
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./shared/components/updateapp/updateapp.component').then(
        (m) => m.UpdateappComponent
      ),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./shared/components/appdetail/appdetail.component').then(
        (m) => m.AppdetailComponent
      ),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
