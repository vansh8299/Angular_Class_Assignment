import { Injectable } from '@angular/core';
import { food } from './fav-food/favInterface';
import { foods } from './fav-food/Favfoodarr';
import { Observable, of } from 'rxjs';
import { MessagefoodserviceService } from './messagefoodservice.service';

@Injectable({
  providedIn: 'root',
})
export class FoodserviceService {
  constructor(private messagefoodservice: MessagefoodserviceService) {}
  getFood(): Observable<food[]> {
    //food is interface
    const FOODS = of(foods); //foods is array of objects
    this.messagefoodservice.add('Food Selected.....');
    return FOODS;
  }
  getOneFood(rank: number): Observable<food> {
    const foodvar = foods.find((f) => f.rank === rank)!;
    this.messagefoodservice.add(`Selected Food= ${foodvar.food}`);
    return of(foodvar);
  }
}
