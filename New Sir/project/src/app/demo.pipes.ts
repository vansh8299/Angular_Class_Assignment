import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousand',

  standalone: true,
})
export class numericpipes implements PipeTransform {
  transform(value: any, ...args: any[]) {
    args.forEach((val, indx, arr) => {
      console.log(val);
    });

    if (!value) return value;

    if (value == 'k') {
      return '10k';
    } else {
      return 'Ten Thousand';
    }
  }
}
