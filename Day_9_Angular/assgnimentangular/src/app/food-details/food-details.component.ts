import { Component } from '@angular/core';
import { food } from '../fav-food/favInterface';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { FoodserviceService } from '../foodservice.service';

@Component({
  selector: 'app-food-details',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.css',
})
export class FoodDetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private foodservice: FoodserviceService
  ) {}

  foodc?: food;

  ngOnInit(): void {
    this.getFood();
  }
  getFood(): void {
    const rank = Number(this.route.snapshot.paramMap.get('rank'));
    this.foodservice.getOneFood(rank).subscribe((f) => (this.foodc = f));
  }

  goBack(): void {
    this.location.back();
  }
}
