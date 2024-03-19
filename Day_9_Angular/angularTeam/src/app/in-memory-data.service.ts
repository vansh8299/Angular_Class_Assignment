import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Member } from './member/member';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const members = [
      { id: 1, name: 'Vansh' },
      { id: 2, name: 'Disha' },
      { id: 3, name: 'Ankit' },
      { id: 4, name: 'Nitanshi' },
    ];
    return { members };
  }

  genId(members: Member[]): number {
    return members.length > 0
      ? Math.max(...members.map((member) => member.id)) + 1
      : 1;
  }
}
