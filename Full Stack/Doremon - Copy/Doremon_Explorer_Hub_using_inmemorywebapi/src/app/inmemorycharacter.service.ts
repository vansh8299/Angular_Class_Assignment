import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { chardetailInter } from './character-detail/chardetailInterface';
import { gadgetdetailinter } from './gadget-detail/gadgetdetailinter';
import { galleryInter } from './gallery/galleryInter';

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

    const gallery = [
      {
        imageUrl:
          'https://wallpapers.com/images/high/flying-and-winking-doraemon-iphone-omiax63ve36g8ls3.webp',
        id: 1,
      },
      {
        imageUrl:
          'https://wallpapers.com/images/high/cute-nobita-watching-tv-with-doraemon-cby61fad07nqlt0t.webp',
        id: 2,
      },
      {
        imageUrl:
          'https://wallpapers.com/images/high/room-doraemon-4k-v1yj0ac84uiv8j5d.webp',
        id: 3,
      },
      {
        imageUrl:
          'https://wallpapers.com/images/high/doraemon-anime-series-jyi51qfzj7w2aq1e.webp',
        id: 4,
      },
      {
        imageUrl:
          'https://wallpapers.com/images/high/crazy-cartoon-8zlj1r5h52u8pvge.webp',
        id: 5,
      },
      {
        imageUrl:
          'https://wallpapers.com/images/high/doraemon-in-outer-space-ylg89xqr55bpg3lt.webp',
        id: 6,
      },
    ];

    return { characters, gadgets, gallery };
  }

  genId<T extends chardetailInter | gadgetdetailinter | galleryInter>(
    myTable: T[]
  ): number {
    return Number(
      myTable.length > 0 ? Math.max(...myTable.map((t) => t.id)) + 1 : 1
    );
  }
}
