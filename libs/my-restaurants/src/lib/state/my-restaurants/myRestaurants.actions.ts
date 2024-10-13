import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { MyRestaurantsState } from './myRestaurants.state';
import { Restaurant } from '@restaurant-booking/shared-types';

export const myRestaurantsActions = createActionGroup({
  source: 'My Restaurants',
  events: {
    getMyRestaurants: emptyProps(),
    getMyRestaurantsSuccess: props<{ myRestaurants: Restaurant[] }>(),
    getMyRestaurantsFailure: props<{ error: string }>(),

    getRestaurantDetailsById: props<{ id: string }>(),
    getRestaurantDetailsByIdSuccess:props<{ restaurant: Restaurant }>(),
    getRestaurantDetailsByIdFailure: props<{ error: string }>(),
  },
});
