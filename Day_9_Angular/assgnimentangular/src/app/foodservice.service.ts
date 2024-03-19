import { Injectable } from '@angular/core';
import { food } from './fav-food/favInterface';
import { foods } from './fav-food/Favfoodarr';
import { Observable, of } from 'rxjs';
import { MessagefoodserviceService } from './messagefoodservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FoodserviceService {
  private foodsurl = 'api/foods';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' }),
  };
  constructor(
    private messagefoodservice: MessagefoodserviceService,
    private http: HttpClient
  ) {}
  getFood(): Observable<food[]> {
    return this.http.get<food[]>(this.foodsurl);
  }
  getOneFood(rank: number): Observable<food> {
    const url = `${this.foodsurl}/${rank}`;
    return this.http.get<food>(url);
  }

  updateFood(f: food): Observable<any> {
    return this.http.put(this.foodsurl, f, this.httpOptions);
  }

  addFood(foo: food): Observable<food> {
    return this.http.post<food>(this.foodsurl, foo, this.httpOptions);
  }

  deletefood(rank: number): Observable<food> {
    const url = `${this.foodsurl}/${rank}`;
    return this.http.delete<food>(url, this.httpOptions);
  }
}
