// import { Component } from '@angular/core';
// import { CurrencyPipe } from '@angular/common';
// import { NgIf } from '@angular/common';

// @Component({
//   selector: 'app-component1',
//   standalone: true,
//   imports: [CurrencyPipe, NgIf],
//   providers: [CurrencyPipe],
//   templateUrl: './component1.component.html',
//   styleUrl: './component1.component.css',
// })
// export class Component1Component {
//   name = 'T-Shirt';
//   price = 19.99;
//   quantity = 2;
//   stock = 10;
//   constructor(private currencyPipe: CurrencyPipe) {}
//   get totalPrice() {
//     return this.currencyPipe.transform(
//       this.price * this.quantity,
//       'USD',
//       '1.2-2'
//     );
//   }
//   get inStock() {
//     return this.stock > 0;
//   }
// }
