import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { restaurantsActions } from '../state/restaurants.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectRestaurants,
  selectRestaurantsLoading,
} from '../state/restaurants.selectors';
import { ImagePipe } from '@restaurant-booking/shared-ui';

@Component({
  selector: 'rb-restaurants',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ImagePipe],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss',
})
export class RestaurantsComponent implements OnInit {
  private store = inject(Store);
  public restaurants = toSignal(this.store.select(selectRestaurants));
  public loading = toSignal(this.store.select(selectRestaurantsLoading));

  ngOnInit() {
    this.store.dispatch(restaurantsActions.loadRestaurants());
  }
}
