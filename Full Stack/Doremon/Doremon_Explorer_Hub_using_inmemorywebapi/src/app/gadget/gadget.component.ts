import { Component } from '@angular/core';

import { GadgetserviceService } from '../gadgetservice.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gadgetdetailinter } from '../gadget-detail/gadgetdetailinter';
import { GadgetSearchComponent } from '../gadget-search/gadget-search.component';
@Component({
  selector: 'app-gadget',
  standalone: true,
  imports: [NgFor, RouterModule, GadgetSearchComponent],
  templateUrl: './gadget.component.html',
  styleUrl: './gadget.component.css',
})
export class GadgetComponent {
  gads: gadgetdetailinter[] = [];
  constructor(private gadgetService: GadgetserviceService) {}

  ngOnInit(): void {
    this.getgad();
  }

  getgad(): void {
    this.gadgetService.getGad().subscribe((c) => (this.gads = c));
  }

  addgad(name: string, color: string): void {
    name = name.trim();
    color = color.trim();
    if (!name || !color) {
      return;
    }
    this.gadgetService
      .addGad({ name, color } as gadgetdetailinter)
      .subscribe((g) => this.gads.push(g));
  }
  deletegad(gad: gadgetdetailinter): void {
    this.gads = this.gads.filter((m) => m != gad);
    this.gadgetService.deleteGad(gad.id).subscribe();
  }
}
