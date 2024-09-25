import { Restaurant } from '@restaurant-booking/shared-types';

export interface RestaurantsStateModel {
  restaurants: Restaurant[];
  loading: boolean;
  error: string;
}

export const initialRestaurantsState: RestaurantsStateModel = {
  restaurants: [],
  loading: false,
  error: '',
};
