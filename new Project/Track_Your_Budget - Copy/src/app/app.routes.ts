import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'budget-tracker',
    loadChildren: () =>
      import('./budget-tracker/budget-tracker.module').then(
        (m) => m.BudgetTrackerModule
      ),
  },
  {
    path: '',
    redirectTo: '/budget-tracker/login',
    pathMatch: 'full',
  },
];
