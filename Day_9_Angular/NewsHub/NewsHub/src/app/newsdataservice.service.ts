import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { NEWS } from './newsInterface';

@Injectable({
  providedIn: 'root',
})
export class NewsdataserviceService implements InMemoryDbService {
  createDb() {
    const news = [
      {
        id: 1,
        title: 'New Discovery in Space',
        category: 'Science',
        description:
          'Scientists have discovered a new celestial object in the Orion constellation.',
        author: 'Dr. Astronomer',
        publication: new Date('2024-03-20'),
      },
      {
        id: 2,
        title: 'Tech Giant Launches New Smartphone',
        category: 'Technology',
        description:
          'Leading tech company XYZ has unveiled its latest smartphone model with groundbreaking features.',
        author: 'Tech Reporter',
        publication: new Date('2024-03-19'),
      },
      {
        id: 3,
        title: 'Political Unrest in Region X',
        category: 'Politics',
        description:
          'Tensions rise as protests erupt in response to recent government policies in Region X.',
        author: 'Political Analyst',
        publication: new Date('2024-03-18'),
      },
      {
        id: 4,
        title: 'Sports Team Wins Championship',
        category: 'Sports',
        description:
          'Local sports team triumphs in the championship match after a nail-biting game.',
        author: 'Sports Correspondent',
        publication: new Date('2024-03-17'),
      },
    ];
    return { news };
  }

  genId(news: NEWS[]): number {
    return news.length > 0 ? Math.max(...news.map((n) => n.id)) + 1 : 1;
  }
}
