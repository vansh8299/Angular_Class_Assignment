import { Component } from '@angular/core';
import { food } from '../fav-food/favInterface';
import { FoodserviceService } from '../foodservice.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  favfoods: food[] = [];

  constructor(private foodservice: FoodserviceService) {}

  ngOnInit(): void {
    this.getfood();
  }
  getfood(): void {
    this.foodservice.getFood().subscribe((f) => (this.favfoods = f));
  }
}
