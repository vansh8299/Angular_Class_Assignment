import { Component } from '@angular/core';
import { MoviesdataService } from '../moviesdata.service';
import { WebSeries } from '../interface';
import { SeriesdetailComponent } from '../seriesdetail/seriesdetail.component';
import { NgFor } from '@angular/common';
import { DescriptionseriesService } from '../descriptionseries.service';

@Component({
  selector: 'app-seriescomponent',
  standalone: true,
  imports: [SeriesdetailComponent, NgFor],
  templateUrl: './seriescomponent.component.html',
  styleUrl: './seriescomponent.component.css',
})
export class SeriescomponentComponent {
  series: WebSeries[] = [];
  constructor(
    private seriesService: MoviesdataService,
    private descser: DescriptionseriesService
  ) {}

  ngOnInit(): void {
    this.getseries();
  }
  getseries(): void {
    this.seriesService.getWebSeries().subscribe((s) => (this.series = s));
  }

  selectwebseries?: WebSeries;
  onSelect(i: WebSeries): void {
    this.selectwebseries = i;
    this.descser.add(`Selected Series: ${i.name}`);
  }
}
