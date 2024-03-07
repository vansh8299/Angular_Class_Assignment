import { Injectable } from '@angular/core';
import { food } from './fav-food/favInterface';
import { foods } from './fav-food/Favfoodarr';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodserviceService {
  constructor() {}
  getFood(): Observable<food[]> {
    //food is interface
    return of(foods); //foods is array of objects
  }
}
