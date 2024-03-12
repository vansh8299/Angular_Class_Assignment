import { Component } from '@angular/core';
import { foods } from './Favfoodarr';
import { NgFor } from '@angular/common';
import { food } from './favInterface';
import { FoodDetailsComponent } from '../food-details/food-details.component';
import { FoodserviceService } from '../foodservice.service';
import { MessagefoodserviceService } from '../messagefoodservice.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-fav-food',
  standalone: true,
  imports: [NgFor, FoodDetailsComponent, RouterModule],
  templateUrl: './fav-food.component.html',
  styleUrl: './fav-food.component.css',
})
export class FavFoodComponent {
  foodl: food[] = [];
  constructor(
    private foodService: FoodserviceService,
    private messagefoodService: MessagefoodserviceService
  ) {}

  ngOnInit(): void {
    this.getFod();
  }

  getFod(): void {
    this.foodService.getFood().subscribe((fo) => (this.foodl = fo));
  }

  selectedfood?: food;
  onSelect(f: food): void {
    this.selectedfood = f;
    this.messagefoodService.add(`Selected Food= ${f.rank}`);
  }
}
