import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { chardetailInter } from './character-detail/chardetailInterface';
import { chardetailarr } from './character-detail/chardetailarr';
import { MessageserviceService } from './messageservice.service';

@Injectable({
  providedIn: 'root',
})
export class CharaterdetailserviceService {
  constructor(private messageServices: MessageserviceService) {}
  getChardetail(id1: number): Observable<chardetailInter> {
    const chardetail = chardetailarr.find((char) => char.charid === id1)!;
    this.messageServices.add(`Character Fetched: ${id1}`);
    return of(chardetail);
  }
}
