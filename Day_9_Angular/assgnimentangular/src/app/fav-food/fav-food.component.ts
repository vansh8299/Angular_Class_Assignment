import { Component } from '@angular/core';
import { foods } from './Favfoodarr';
import { NgFor } from '@angular/common';
import { food } from './favInterface';
import { FoodDetailsComponent } from '../food-details/food-details.component';

@Component({
  selector: 'app-fav-food',
  standalone: true,
  imports: [NgFor, FoodDetailsComponent],
  templateUrl: './fav-food.component.html',
  styleUrl: './fav-food.component.css',
})
export class FavFoodComponent {
  foodl = foods;

  selectedfood?: food;
  onSelect(f: food): void {
    this.selectedfood = f;
  }
}
