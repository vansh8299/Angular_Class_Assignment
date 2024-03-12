import { Component } from '@angular/core';
import { gadgetdetailinter } from './gadgetdetailinter';
import { GadgetdetailserviceService } from '../gadgetdetailservice.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gadget-detail',
  standalone: true,
  imports: [],
  templateUrl: './gadget-detail.component.html',
  styleUrl: './gadget-detail.component.css',
})
export class GadgetDetailComponent {
  gaddetails?: gadgetdetailinter;

  constructor(
    private gaddetailService: GadgetdetailserviceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getgaddetail();
  }

  getgaddetail(): void {
    const id1 = Number(this.route.snapshot.paramMap.get('gadid'));
    console.log(id1);
    this.gaddetailService
      .getGaddetail(id1)
      .subscribe((c) => (this.gaddetails = c));
  }
  getBack(): void {
    this.location.back();
  }
}
