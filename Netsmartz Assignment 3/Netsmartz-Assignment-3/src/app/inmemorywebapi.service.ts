import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { iteminterface } from './iteminterface';

@Injectable({
  providedIn: 'root',
})
export class InmemorywebapiService implements InMemoryDbService {
  createDb() {
    const items = [
      {
        id: 1,
        name: 'Monitor',
        description: 'It is a hardware used for displaying the information',
        price: 9000,
      },
      {
        id: 2,
        name: 'CPU',
        description: 'It is a hardware used for processing the information',
        price: 25000,
      },
      {
        id: 3,
        name: 'Mouse',
        description: 'It is a hardware used for controlling',
        price: 500,
      },
      {
        id: 4,
        name: 'Keyboard',
        description: 'It is a hardware used for typing the information',
        price: 1000,
      },
    ];
    return { items };
  }

  genId(items: iteminterface[]): number {
    return items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  }
}
