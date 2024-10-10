import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectMyRestaurants, selectMyRestaurantsLoading } from '../state/my-restaurants/myRestaurants.selectors';
import { myRestaurantsActions } from '../state/my-restaurants/myRestaurants.actions';
import { CardComponent, LinkButtonComponent } from '@restaurant-booking/shared-ui';

@Component({
  selector: 'rb-my-restaurants',
  standalone: true,
  imports: [CommonModule, CardComponent, LinkButtonComponent],
  templateUrl: './my-restaurants.component.html',
  styleUrl: './my-restaurants.component.scss',
})
export class MyRestaurantsComponent implements OnInit {
  private store = inject(Store);

  public restaurants = toSignal(this.store.select(selectMyRestaurants), {initialValue: []});
  public loading = toSignal(this.store.select(selectMyRestaurantsLoading), {initialValue:true});

  public noRestaurantsFound = computed(() => {
    return this.restaurants().length === 0 && !this.loading();
  })

  ngOnInit(): void {
    if (!this.restaurants().length) {
      this.store.dispatch(myRestaurantsActions.getMyRestaurants());
    }
  }

}
