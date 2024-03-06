import { Component, Input } from '@angular/core';
import { food } from '../fav-food/favInterface';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food-details',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './food-details.component.html',
  styleUrl: './food-details.component.css',
})
export class FoodDetailsComponent {
  @Input() foodc?: food;
}
