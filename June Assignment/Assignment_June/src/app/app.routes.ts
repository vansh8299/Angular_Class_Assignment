import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

import { DisplaydataComponent } from './displaydata/displaydata.component';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'display', component: DisplaydataComponent },
];
