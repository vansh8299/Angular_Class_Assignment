import { Component } from '@angular/core';
import { iteminterface } from '../iteminterface';
import { ItemserviceService } from '../itemservice.service';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  items: iteminterface[] = [];

  constructor(private itemService: ItemserviceService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((item) => {
      this.items = item;
    });
  }
}
