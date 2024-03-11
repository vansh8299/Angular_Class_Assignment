import { Component } from '@angular/core';
import { DescriptionseriesService } from '../descriptionseries.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-descriptioncomponent',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './descriptioncomponent.component.html',
  styleUrl: './descriptioncomponent.component.css',
})
export class DescriptioncomponentComponent {
  constructor(public descriptionService: DescriptionseriesService) {}
}
