import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe',
  standalone: true,
})
export class CustomPipePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    args.forEach((val, indx, arr) => {
      console.log(val);
    });

    if (!value) return value;

    if (value == '100') {
      return 'One Hunderd';
    } else {
      return 'Ten Thousand';
    }
  }
}
