import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe',
  standalone: true,
})
export class CustomPipePipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}
