import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Interface } from './announcement/interface';

@Injectable({
  providedIn: 'root',
})
export class InmemorywebapiService implements InMemoryDbService {
  createDb() {
    const announcement = [
      {
        id: 1,
        title: 'title1',
        content: 'content1',
        date: '2019-01-01',
      },
      {
        id: 2,
        title: 'title2',
        content: 'content2',
        date: '2019-01-02',
      },
      {
        id: 3,
        title: 'title3',
        content: 'content3',
        date: '2019-01-03',
      },
      {
        id: 4,
        title: 'title4',
        content: 'content4',
        date: '2019-01-04',
      },
    ];
    return { announcement };
  }
  genId<T extends Interface>(myTable: T[]): number {
    const maxId = myTable.reduce((max, item) => {
      return item.id && item.id > max ? item.id : max;
    }, 0);
    return maxId + 1;
  }
}
