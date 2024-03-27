import { Injectable } from '@angular/core';
import { charInter } from './character/charInter';
import { char } from './character/chararr';
import { Observable, of } from 'rxjs';
import { chardetailarr } from './character-detail/chardetailarr';
import { chardetailInter } from './character-detail/chardetailInterface';

@Injectable({
  providedIn: 'root',
})
export class CharacterserviceService {
  constructor() {}
  getChar(): Observable<charInter[]> {
    const c = of(char);
    return c;
  }
  getChardetail(id1: number): Observable<chardetailInter> {
    const chardetail = chardetailarr.find((char) => char.charid === id1)!;

    return of(chardetail);
  }
}
