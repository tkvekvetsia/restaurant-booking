import { CoreResponse, Restaurant } from '@restaurant-booking/shared-types';

export type GetRestaurantsModel = CoreResponse<{ restaurants: Restaurant[] }>;
