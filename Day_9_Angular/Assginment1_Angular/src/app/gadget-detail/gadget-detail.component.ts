import { Component } from '@angular/core';
import { gadgetdetailinter } from './gadgetdetailinter';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GadgetserviceService } from '../gadgetservice.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-gadget-detail',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './gadget-detail.component.html',
  styleUrl: './gadget-detail.component.css',
})
export class GadgetDetailComponent {
  gaddetails?: gadgetdetailinter;

  constructor(
    private gaddetailService: GadgetserviceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getgaddetail();
  }

  getgaddetail(): void {
    const id1 = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id1);
    this.gaddetailService
      .getGaddetail(id1)
      .subscribe((c) => (this.gaddetails = c));
  }
  getBack(): void {
    this.location.back();
  }
  save() {
    if (this.gaddetails) {
      this.gaddetailService
        .updategadget(this.gaddetails)
        .subscribe(() => this.getBack());
    }
  }
}
