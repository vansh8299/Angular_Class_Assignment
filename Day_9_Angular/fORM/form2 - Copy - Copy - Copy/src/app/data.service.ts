import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        firstName: 'Vansh',
        lastName: 'Misra',
        email: 'v@gmail.com',
        password: 'kjbddj',
      },
    ];
    return { users };
  }
}
