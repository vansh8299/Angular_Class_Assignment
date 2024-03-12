import { Injectable } from '@angular/core';
import { charInter } from './character/charInter';
import { char } from './character/chararr';
import { Observable, of } from 'rxjs';
import { MessageserviceService } from './messageservice.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterserviceService {
  constructor(private messageServices: MessageserviceService) {}
  getChar(): Observable<charInter[]> {
    const c = of(char);
    this.messageServices.add(`Character Fetched`);
    return c;
  }
}
