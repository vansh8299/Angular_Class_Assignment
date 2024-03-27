import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { chardetailInter } from './character-detail/chardetailInterface';
import { gadgetdetailinter } from './gadget-detail/gadgetdetailinter';

@Injectable({
  providedIn: 'root',
})
export class InmemorycharacterService implements InMemoryDbService {
  createDb() {
    const characters = [
      { name: 'Nobita', id: 1, height: 4.3, weight: 40 },
      { name: 'Sunio', id: 2, height: 3.4, weight: 30 },
      { name: 'Shizhuka', id: 3, height: 4.2, weight: 35 },
      { name: 'Jeean', id: 4, height: 5, weight: 500 },
    ];
    const gadgets = [
      {
        id: 1,
        name: 'Bamboocopter',
        color: 'Red',
      },
      {
        id: 2,
        name: 'Time Machine',
        color: 'Red',
      },
      {
        id: 3,
        name: 'Anywhere Door',
        color: 'Red',
      },
      {
        id: 4,
        name: 'Big Light',
        color: 'Red',
      },
    ];

    return { characters, gadgets };
  }

  genId<T extends chardetailInter | gadgetdetailinter>(myTable: T[]): number {
    return Number(
      myTable.length > 0 ? Math.max(...myTable.map((t) => t.id)) + 1 : 1
    );
  }
}
