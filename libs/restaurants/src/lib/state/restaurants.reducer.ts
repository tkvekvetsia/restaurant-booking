import { createReducer, on } from '@ngrx/store';
import { initialRestaurantsState } from './restaurants.state';
import { restaurantsActions } from './restaurants.actions';

export const restaurantsReducer = createReducer(
  initialRestaurantsState,
  on(restaurantsActions.loadRestaurants, state => ({
    ...state,
    loading: true,
    error: '',
  })),

  on(restaurantsActions.loadRestaurantsSuccess, (state, actions) => ({
    ...state,
    restaurants: actions.restaurants,
    loading: false,
    error: '',
  })),

  on(restaurantsActions.loadRestaurantsFailure, (state, actions) => ({
    ...state,
    restaurants: [],
    loading: false,
    error: actions.error,
  }))
);
