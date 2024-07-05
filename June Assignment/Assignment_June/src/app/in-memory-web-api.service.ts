import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Userinterface } from './interface';

@Injectable({
  providedIn: 'root',
})
export class InMemoryWebApiService implements InMemoryDbService {
  createDb() {
    const data = [
      { id: 1, name: 'John Doe', email: 'j@gmail.com', password: 'John' },
      { id: 2, name: 'Jane Smith', email: 'jane@gmail.com', password: 'Smith' },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'm@gmail.com',
        password: 'Johnson',
      },
    ];
    return { data };
  }

  genId(items: Userinterface[]): number {
    return items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  }
}
