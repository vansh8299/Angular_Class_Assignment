import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { gadgetdetailinter } from './gadget-detail/gadgetdetailinter';
import { gaddetailarr } from './gadget-detail/gadgetdetailarr';

@Injectable({
  providedIn: 'root',
})
export class GadgetdetailserviceService {
  constructor() {}
  getGaddetail(id1: number): Observable<gadgetdetailinter> {
    const gaddetail = gaddetailarr.find((char) => char.gadid === id1)!;

    return of(gaddetail);
  }
}
