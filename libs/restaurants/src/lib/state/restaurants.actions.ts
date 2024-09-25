import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Restaurant } from '@restaurant-booking/shared-types';

export const restaurantsActions = createActionGroup({
  source: 'Restaurants',
  events: {
    loadRestaurants: emptyProps(),
    loadRestaurantsSuccess: props<{ restaurants: Restaurant[] }>(),
    loadRestaurantsFailure: props<{ error: string }>(),
  },
});
