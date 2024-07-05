import { Component, OnInit } from '@angular/core';
import { Product } from '../interface';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css',
})
export class ProductdetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: DataService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(id).subscribe((product) => {
      this.product = product;
    });
  }

  goBack(): void {
    window.history.back();
  }

  save(): void {
    if (this.product) {
      this.productService.updateProduct(this.product).subscribe();
    }
  }
}
