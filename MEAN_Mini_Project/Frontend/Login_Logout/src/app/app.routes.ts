import { Routes } from '@angular/router';

import { authGuardGuard } from './core/guards/AuthGuard/auth-guard.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuardGuard],
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./features/intropage/intropage.component').then(
        (m) => m.IntropageComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./shared/components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./features/page404/page404.component').then(
        (m) => m.Page404Component
      ),
  },
];
