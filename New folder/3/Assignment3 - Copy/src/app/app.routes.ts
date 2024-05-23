import { Routes } from '@angular/router';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementFormComponent } from './announcement-form/announcement-form.component';
import { updateformComponent } from './updateform/updateform.component';

export const routes: Routes = [
  { path: 'announcements', component: AnnouncementComponent },
  { path: 'add', component: AnnouncementFormComponent },
  { path: 'edit/:id', component: updateformComponent },
  { path: '', redirectTo: 'announcements', pathMatch: 'full' },
];
