import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { gadgetdetailinter } from './gadget-detail/gadgetdetailinter';
import { gaddetailarr } from './gadget-detail/gadgetdetailarr';
import { MessageserviceService } from './messageservice.service';

@Injectable({
  providedIn: 'root',
})
export class GadgetdetailserviceService {
  constructor(private messageServices: MessageserviceService) {}
  getGaddetail(id1: number): Observable<gadgetdetailinter> {
    const gaddetail = gaddetailarr.find((char) => char.gadid === id1)!;
    this.messageServices.add(`Gadget Fetched: ${id1}`);
    return of(gaddetail);
  }
}
