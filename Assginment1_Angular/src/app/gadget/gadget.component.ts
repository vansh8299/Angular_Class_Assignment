import { Component } from '@angular/core';
import { GadInter } from './gadInter';
import { GadgetserviceService } from '../gadgetservice.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-gadget',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './gadget.component.html',
  styleUrl: './gadget.component.css',
})
export class GadgetComponent {
  gads: GadInter[] = [];
  constructor(private gadgetService: GadgetserviceService) {}

  ngOnInit(): void {
    this.getgad();
  }

  getgad(): void {
    this.gadgetService.getGad().subscribe((c) => (this.gads = c));
  }
}
