import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RestaurantManagementFacadeService } from '../../services/restaurant-management-facade.service';
import { myRestaurantsActions } from './myRestaurants.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { restaurantsActions } from "@restaurant-booking/restaurants";
import { Store } from "@ngrx/store";
import { selectMyRestaurants } from "./myRestaurants.selectors";

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


export const getRestaurantDetailsByIdEffect = createEffect(
  (
    actions$ = inject(Actions),
    restaurantManegmentFacadeService = inject(RestaurantManagementFacadeService),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(myRestaurantsActions.getRestaurantDetailsById),
      withLatestFrom(store.select(selectMyRestaurants)),
      switchMap(result => {
        const [action, restaurants] = result;
        if (restaurants && restaurants.length) {
          const restaurant = restaurants.find(restaurant => restaurant.id === action.id);
          if (restaurant) {
            return of(myRestaurantsActions.getRestaurantDetailsByIdSuccess({ restaurant }));
          }
        }


        return restaurantManegmentFacadeService.getRestaurantDetailsById(action.id).pipe(
          map(res => {
            if (res.status === 'success' && res.data) {
              return myRestaurantsActions.getRestaurantDetailsByIdSuccess({ restaurant: res.data.restaurant });
            }
            return myRestaurantsActions.getRestaurantDetailsByIdFailure({ error: res.message || '' });
          }),
          catchError(() =>of(myRestaurantsActions.getRestaurantDetailsByIdFailure({ error: 'Something Went Wrong' })))
        );

      }))
  }, { functional: true }
);
