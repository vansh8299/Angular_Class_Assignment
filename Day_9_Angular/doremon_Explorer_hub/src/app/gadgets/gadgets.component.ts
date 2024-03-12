import { Component } from '@angular/core';
import { GadgetsInterface } from './GadgetsInterface';
import { GadgetserviceService } from '../gadgetservice.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-gadgets',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './gadgets.component.html',
  styleUrl: './gadgets.component.css',
})
export class GadgetsComponent {
  gadgetss: GadgetsInterface[] = [];
  constructor(private gadgetservice: GadgetserviceService) {}

  ngOnInit() {
    this.getgadgets();
  }
  getgadgets() {
    this.gadgetservice
      .getGadgets()
      .subscribe((gadgets) => (this.gadgetss = gadgets));
  }
}
