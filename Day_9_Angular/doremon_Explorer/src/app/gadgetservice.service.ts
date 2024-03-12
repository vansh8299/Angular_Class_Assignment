import { Injectable } from '@angular/core';
import { GadInter } from './gadget/gadInter';
import { Gadarr } from './gadget/gadarr';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GadgetserviceService {
  constructor() {}
  getGad(): Observable<GadInter[]> {
    const g = of(Gadarr);
    return g;
  }
}
