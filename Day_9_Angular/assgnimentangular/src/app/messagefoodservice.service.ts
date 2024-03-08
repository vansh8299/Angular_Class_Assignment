import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessagefoodserviceService {
  constructor() {}

  messagesfood: string[] = [];
  add(messagefood: string) {
    this.messagesfood.push(messagefood);
  }
  clear() {
    this.messagesfood = [];
  }
}
