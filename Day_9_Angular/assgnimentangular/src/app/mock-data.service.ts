import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { food } from './fav-food/favInterface';

@Injectable({
  providedIn: 'root',
})
export class MockDataService implements InMemoryDbService {
  createDb() {
    const foods = [
      { rank: 1, food: 'Masala Dosa' },
      { rank: 2, food: 'Tehri' },
      { rank: 3, food: 'Momos with mayonise' },
      { rank: 4, food: 'Aloo Tikki with dahi' },
    ];
    return { foods };
  }
  genId(foods: food[]): number {
    return foods.length > 0
      ? Math.max(...foods.map((food) => food.rank)) + 1
      : 1;
  }
}
