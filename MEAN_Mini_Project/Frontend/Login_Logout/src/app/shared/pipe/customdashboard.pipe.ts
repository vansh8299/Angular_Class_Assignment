import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customdashboard',
  standalone: true,
})
export class CustomdashboardPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value === undefined || value === null) {
      return '';
    }
    return value.toUpperCase();
  }
}
