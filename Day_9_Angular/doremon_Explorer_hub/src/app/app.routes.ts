import { Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GadgetsComponent } from './gadgets/gadgets.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { GadgetDetailComponent } from './gadget-detail/gadget-detail.component';

export const routes: Routes = [
  { path: 'character', component: CharactersComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'Gadgets', component: GadgetsComponent },
  { path: 'character/:name', component: CharacterDetailComponent },
  { path: 'gadget/:gadgetid', component: GadgetDetailComponent },
];
