import { Routes } from '@angular/router';
import { UpdateappformComponent } from './updateappform/updateappform.component';
import { CreateappformComponent } from './createappform/createappform.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { AppdetailComponent } from './appdetail/appdetail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AllappsComponent } from './allapps/allapps.component';
import { InstalledappsComponent } from './installedapps/installedapps.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponentComponent,
  },
  {
    path: 'create',
    component: CreateappformComponent,
  },
  {
    path: 'update/:id',
    component: UpdateappformComponent,
  },
  {
    path: 'app/:id',
    component: AppdetailComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'profileuser',
    component: UserprofileComponent,
  },
  {
    path: 'allapps',
    component: AllappsComponent,
  },
  {
    path: 'installedapps',
    component: InstalledappsComponent,
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
