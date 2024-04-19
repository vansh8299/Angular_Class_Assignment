import { Routes } from '@angular/router';

import { GalleryComponent } from './gallery/gallery.component';

import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { GadgetDetailComponent } from './gadget-detail/gadget-detail.component';
import { CharacterComponent } from './character/character.component';
import { GadgetComponent } from './gadget/gadget.component';

export const routes: Routes = [
  { path: 'character', component: CharacterComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'Gadgets', component: GadgetComponent },
  { path: 'character/:id', component: CharacterDetailComponent },
  { path: 'gadget/:id', component: GadgetDetailComponent },
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
];
