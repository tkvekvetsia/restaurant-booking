import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { restaurantsActions } from './restaurants.actions';
import { RestaurantsFacadeService } from '../services/restaurants-facade.service';

export const loadRestaurantsEffect = createEffect(
  (
    actions$ = inject(Actions),
    restaurantsFacadeService = inject(RestaurantsFacadeService)
  ) => {
    return actions$.pipe(
      ofType(restaurantsActions.loadRestaurants),
      switchMap(() => {
        return restaurantsFacadeService.getAllRestaurants().pipe(
          map(response => {
            if (response.status === 'success' && response.data) {
              return restaurantsActions.loadRestaurantsSuccess({
                restaurants: response.data.restaurants,
              });
            }
            return restaurantsActions.loadRestaurantsFailure({
              error: response.message || '',
            });
          }),
          catchError(_ =>
            of(restaurantsActions.loadRestaurantsFailure({ error: '' }))
          )
        );
      })
    );
  },
  { functional: true }
);
