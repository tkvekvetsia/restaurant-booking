import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RestaurantManagementFacadeService } from '../../services/restaurant-management-facade.service';
import { myRestaurantsActions } from './myRestaurants.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const getMyRestaurantsEffect = createEffect(
  (
    actions$ = inject(Actions),
    restaurantManegmentFacadeService = inject(RestaurantManagementFacadeService)
  ) => {
    return actions$.pipe(
      ofType(myRestaurantsActions.getMyRestaurants),
      switchMap(() => {
        return restaurantManegmentFacadeService.getRestaurantsByUser().pipe(
          map(response => {
            if (response.status === 'success' && response.data) {
              return myRestaurantsActions.getMyRestaurantsSuccess({
                myRestaurants: response.data.restaurants,
              });
            }
            return myRestaurantsActions.getMyRestaurantsFailure({
              error: response.message || '',
            });
          }),
          catchError(() =>
            of(
              myRestaurantsActions.getMyRestaurantsFailure({
                error: 'Something Went Wrong',
              })
            )
          )
        );
      })
    );
  },
  { functional: true }
);
