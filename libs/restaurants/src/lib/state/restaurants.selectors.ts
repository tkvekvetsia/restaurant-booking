import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { restaurantsReducer } from './restaurants.reducer';
import { RestaurantsStateModel } from './restaurants.state';

export const RESTAURANTS_SELECTOR_FEATURE_KEY = 'restaurants';

export const selectRestaurantsState =
  createFeatureSelector<RestaurantsStateModel>(
    RESTAURANTS_SELECTOR_FEATURE_KEY
  );

export const selectRestaurants = createSelector(
  selectRestaurantsState,
  state => state.restaurants
);

export const selectRestaurantsLoading = createSelector(
  selectRestaurantsState,
  state => state.loading
);

export const selectRestaurantsError = createSelector(
  selectRestaurantsState,
  state => state.error
);

export const restaurantsFeature = createFeature({
  name: RESTAURANTS_SELECTOR_FEATURE_KEY,
  reducer: restaurantsReducer,
});
