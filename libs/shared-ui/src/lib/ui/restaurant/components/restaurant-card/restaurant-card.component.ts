import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Restaurant } from '@restaurant-booking/shared-types';
import { LinkButtonComponent } from '../../../buttons/link-button/link-button.component';
import { PrimaryButtonComponent } from '../../../buttons/primary-button/primaryButton.component';
import { ImagePipe } from '../../../../pipes/image/image.pipe';

@Component({
  selector: 'rb-restaurant-card',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    PrimaryButtonComponent,
    LinkButtonComponent,
    ImagePipe,
  ],
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant;
  @Input() url = '';
}
