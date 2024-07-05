import { Routes } from '@angular/router';
import { EquationCheckComponent } from './equation-check/equation-check.component';

export const routes: Routes = [
  { path: 'equation-check', component: EquationCheckComponent },
  { path: '', redirectTo: '/equation-check', pathMatch: 'full' },
];
