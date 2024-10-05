import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@restaurant-booking/environment';

@Pipe({
  name: 'image',
  standalone: true,
})
export class ImagePipe implements PipeTransform {
  transform(value: string): string {
    return `${environment.apiUrl}/images/${value}`;
  }
}
