import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from '../interface';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [NgFor],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css',
})
export class ProductlistComponent {
  products: Product[] = [];

  constructor(private productService: DataService) {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }
}
