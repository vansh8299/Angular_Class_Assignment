import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { iteminterface } from '../iteminterface';
import { ItemserviceService } from '../itemservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-itemdetail',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './itemdetail.component.html',
  styleUrl: './itemdetail.component.css',
})
export class ItemdetailComponent {
  itemdetail?: iteminterface;

  constructor(
    private itemService: ItemserviceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getitemdetail();
  }
  getitemdetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.itemService.getItemdetail(id).subscribe((i) => (this.itemdetail = i));
  }
  getBack(): void {
    this.location.back();
  }
}
