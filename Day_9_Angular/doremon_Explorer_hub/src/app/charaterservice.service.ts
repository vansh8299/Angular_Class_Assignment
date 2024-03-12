import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { characterinterface } from './characters/characterInterface';
import { character } from './characters/characterarr';

@Injectable({
  providedIn: 'root',
})
export class CharaterserviceService {
  constructor() {}

  getChar(): Observable<characterinterface[]> {
    const char = of(character);
    return char;
  }
}
