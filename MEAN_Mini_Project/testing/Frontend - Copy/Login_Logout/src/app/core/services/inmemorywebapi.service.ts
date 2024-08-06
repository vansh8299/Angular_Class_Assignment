import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { appInterface } from '../../features/appinterface';

@Injectable({
  providedIn: 'root',
})
export class InmemorywebapiService implements InMemoryDbService {
  createDb() {
    const applications = [
      {
        id: 1,
        name: 'Whatsapp',
        imageurl: 'assets/whatsapp.jpeg',
        description: 'Social Media Platform',
      },
      {
        id: 2,
        name: 'Facebook',
        imageurl: 'assets/facebook.jpeg',
        description: 'Social Media Platform',
      },
      {
        id: 3,
        name: 'Groww',
        imageurl: 'assets/grow-app.png',
        description: 'Investment App',
      },
      {
        id: 4,
        name: 'Yono',
        imageurl: 'assets/yono.jpeg',
        description: 'Banking App',
      },
      {
        id: 5,
        name: 'Youtube',
        imageurl: 'assets/youtube.png',
        description: 'Entertainement Platform',
      },
      {
        id: 6,
        name: 'Paytm',
        imageurl: 'assets/paytm.png',
        description: 'Payment App',
      },
      {
        id: 7,
        name: 'Sony',
        imageurl: 'assets/sony.jpeg',
        description: 'Social Media Platform',
      },
    ];
    return { applications };
  }
  genId(items: appInterface[]): number {
    return items.length > 0
      ? Math.max(...items.map((item) => item.id ?? 0)) + 1
      : 1;
  }
}
