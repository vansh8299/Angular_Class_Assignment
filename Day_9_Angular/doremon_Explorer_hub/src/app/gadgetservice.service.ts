import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GadgetsInterface } from './gadgets/GadgetsInterface';
import { gadgets } from './gadgets/Gadgetsarr';

@Injectable({
  providedIn: 'root',
})
export class GadgetserviceService {
  constructor() {}

  getGadgets(): Observable<GadgetsInterface[]> {
    const Gad = of(gadgets);

    return Gad;
  }
}
