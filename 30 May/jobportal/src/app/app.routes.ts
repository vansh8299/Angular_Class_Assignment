import { Routes } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { RegisterformComponent } from './registerform/registerform.component';
import { JobsComponent } from './jobs/jobs.component';
import { CreatejobformComponent } from './createjobform/createjobform.component';
import { UpdateJobFormComponent } from './update-job-form/update-job-form.component';
import { AngularmaterialComponent } from './angularmaterial/angularmaterial.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginformComponent,
  },
  {
    path: 'register',
    component: RegisterformComponent,
  },
  {
    path: 'jobs',
    component: JobsComponent,
  },
  {
    path: 'create',
    component: CreatejobformComponent,
  },
  {
    path: 'update/:id',
    component: UpdateJobFormComponent,
  },
  {
    path: 'angular',
    component: AngularmaterialComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
