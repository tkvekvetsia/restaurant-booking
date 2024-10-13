import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectRestaurant } from '../../state/my-restaurants/myRestaurants.selectors';
import { myRestaurantsActions } from '../../state/my-restaurants/myRestaurants.actions';

@Component({
  selector: 'rb-restaurant-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestaurantDetailsComponent implements OnInit{
  private store = inject(Store)
  public restaurant = toSignal(this.store.select(selectRestaurant), {initialValue: null});
  @Input() id  = '';

  ngOnInit(): void {
    this.store.dispatch(myRestaurantsActions.getRestaurantDetailsById({id: this.id}));
  }

}
