import { Restaurant } from "@restaurant-booking/shared-types";

export interface MyRestaurantsState {
   myRestaurants: Restaurant[],
   loading: boolean, 
   error: string,
   restaurant: Restaurant | null,
   loadingRestaurant: boolean,
   errorRestaurant: string,
}  
    
export const myRestaurantsState: MyRestaurantsState = {
   myRestaurants: [],
   loading: false, 
   restaurant: null,
   error: '',
   loadingRestaurant: false,
   errorRestaurant: '',
}    
