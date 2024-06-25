import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AllsongsComponent } from './allsongs/allsongs.component';
import { AddsongComponent } from './addsong/addsong.component';
import { UpdatesongComponent } from './updatesong/updatesong.component';
import { SongdetailComponent } from './songdetail/songdetail.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserallsongsComponent } from './userallsongs/userallsongs.component';
import { SonguserdetailComponent } from './songuserdetail/songuserdetail.component';
import { AllplaylistComponent } from './allplaylist/allplaylist.component';

export const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,

    children: [
      {
        path: 'allsongs',
        component: AllsongsComponent,
      },
      {
        path: 'detail/:id',
        component: SongdetailComponent,
      },
      {
        path: 'add',
        component: AddsongComponent,
      },
      {
        path: 'update/:id',
        component: UpdatesongComponent,
      },
    ],
  },
  {
    path: 'user/dashboard',
    component: UserdashboardComponent,

    children: [
      {
        path: 'allusersongs',
        component: UserallsongsComponent,
      },
      {
        path: 'detail/:id',
        component: SonguserdetailComponent,
      },
      {
        path: 'allplaylist',
        component: AllplaylistComponent,
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
