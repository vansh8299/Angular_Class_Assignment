import { Component } from '@angular/core';
import { foods } from './Favfoodarr';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-fav-food',
  standalone: true,
  imports: [NgFor],
  templateUrl: './fav-food.component.html',
  styleUrl: './fav-food.component.css',
})
export class FavFoodComponent {
  food = foods;
}
