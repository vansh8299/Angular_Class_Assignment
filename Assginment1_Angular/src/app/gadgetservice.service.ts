import { Injectable } from '@angular/core';
import { GadInter } from './gadget/gadInter';
import { Gadarr } from './gadget/gadarr';
import { Observable, of } from 'rxjs';
import { MessageserviceService } from './messageservice.service';

@Injectable({
  providedIn: 'root',
})
export class GadgetserviceService {
  constructor(private messageServices: MessageserviceService) {}
  getGad(): Observable<GadInter[]> {
    const g = of(Gadarr);
    this.messageServices.add(`Gadget Fetched`);
    return g;
  }
}
