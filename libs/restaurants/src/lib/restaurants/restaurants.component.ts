import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { restaurantsActions } from '../state/restaurants.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectRestaurants } from '../state/restaurants.selectors';

@Component({
  selector: 'rb-restaurants',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss',
})
export class RestaurantsComponent implements OnInit {
  private store = inject(Store);
  public restaurants = toSignal(this.store.select(selectRestaurants));

  ngOnInit() {
    this.store.dispatch(restaurantsActions.loadRestaurants());
  }
}
