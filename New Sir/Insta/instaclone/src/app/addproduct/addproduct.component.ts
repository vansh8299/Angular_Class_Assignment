import { Component } from '@angular/core';
import { Product } from '../interface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent {
  product: Product = { id: 0, name: '', description: '', price: 0 };

  constructor(private productService: DataService) {}

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe();
  }
}
