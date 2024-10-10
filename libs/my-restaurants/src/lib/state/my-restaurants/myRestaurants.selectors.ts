import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { MyRestaurantsState } from './myRestaurants.state';
import { myRestaurantsReducer } from './myRestaurants.reducer';

export const MY_RESTAURANTS_FEATURE_KEY = 'myRestaurants';

export const selectMyRestaurantsState = createFeatureSelector<MyRestaurantsState>(
   MY_RESTAURANTS_FEATURE_KEY 
);

export const selectMyRestaurants = createSelector(
    selectMyRestaurantsState,
    (state: MyRestaurantsState) => state.myRestaurants
);

export const selectMyRestaurantsLoading = createSelector(
    selectMyRestaurantsState,
    (state: MyRestaurantsState) => state.loading
);

export const selectMyRestaurantsError = createSelector(
    selectMyRestaurantsState,
    (state: MyRestaurantsState) => state.error
);

export const myRestaurantsFeature = createFeature({
     name: MY_RESTAURANTS_FEATURE_KEY,
     reducer: myRestaurantsReducer,
});
