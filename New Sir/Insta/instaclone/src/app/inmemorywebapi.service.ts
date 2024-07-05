import { Injectable } from '@angular/core';
import { Product } from './interface';

@Injectable({
  providedIn: 'root',
})
export class InmemorywebapiService {
  createDb() {
    const products = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 100 },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 200 },
    ];
    return { products };
  }
  genId(items: Product[]): number {
    return items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  }
}
