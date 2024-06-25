import { Injectable } from '@angular/core';
import { movieinterface } from './angularmaterial/movieinterface';
import { movieinterfacearr } from './angularmaterial/moviesarr';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialserviceService {
  constructor() {}
  getMovie(): Observable<movieinterface[]> {
    const c = of(movieinterfacearr);
    return c;
  }
}
