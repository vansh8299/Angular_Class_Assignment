import { Injectable } from '@angular/core';
import { WebSeries } from './interface';
import { Webarr } from './arraywebseries';
import { Observable, of } from 'rxjs';
import { DescriptionseriesService } from './descriptionseries.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesdataService {
  constructor(private descriptionservice: DescriptionseriesService) {}

  getWebSeries(): Observable<WebSeries[]> {
    const result = of(Webarr);
    this.descriptionservice.add('Top Web Series: ');
    return result;
  }
}
