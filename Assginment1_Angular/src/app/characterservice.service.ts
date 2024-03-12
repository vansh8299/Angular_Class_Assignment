import { Injectable } from '@angular/core';
import { charInter } from './character/charInter';
import { char } from './character/chararr';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterserviceService {
  constructor() {}
  getChar(): Observable<charInter[]> {
    const c = of(char);
    return c;
  }
}
