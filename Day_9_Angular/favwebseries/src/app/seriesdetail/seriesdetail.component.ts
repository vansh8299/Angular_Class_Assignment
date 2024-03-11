import { Component, Input } from '@angular/core';
import { WebSeries } from '../interface';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-seriesdetail',
  standalone: true,
  imports: [FormsModule, NgIf, UpperCasePipe],
  templateUrl: './seriesdetail.component.html',
  styleUrl: './seriesdetail.component.css',
})
export class SeriesdetailComponent {
  @Input() particularseries?: WebSeries;
}
