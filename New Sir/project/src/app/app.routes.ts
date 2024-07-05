import { Routes } from '@angular/router';
import { Component1Component } from './component1/component1.component';
import { authGuard } from '../AuthGuard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';

export const routes: Routes = [
  // {
  //   path: 'component1',
  //   component: Component1Component,
  //   canActivate: [authGuard],
  // },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [authGuard],
  },
  {
    path: 'conditional',
    component: ProtectedComponent,
    canActivate: [authGuard],
  },
  //   { path: '**', redirectTo: '/component1' },
];
