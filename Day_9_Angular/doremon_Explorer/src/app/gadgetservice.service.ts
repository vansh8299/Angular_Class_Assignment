import { Injectable } from '@angular/core';
import { GadInter } from './gadget/gadInter';
import { Gadarr } from './gadget/gadarr';
import { Observable, of } from 'rxjs';
import { gaddetailarr } from './gadget-detail/gadgetdetailarr';
import { gadgetdetailinter } from './gadget-detail/gadgetdetailinter';

@Injectable({
  providedIn: 'root',
})
export class GadgetserviceService {
  constructor() {}
  getGad(): Observable<GadInter[]> {
    const g = of(Gadarr);
    return g;
  }
  getGaddetail(id1: number): Observable<gadgetdetailinter> {
    const gaddetail = gaddetailarr.find((char) => char.gadid === id1)!;

    return of(gaddetail);
  }
}
