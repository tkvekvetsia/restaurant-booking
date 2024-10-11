import { Restaurant } from "@restaurant-booking/shared-types";

export interface MyRestaurantsState {
   myRestaurants: Restaurant[],
   loading: boolean, 
   error: string,
}  
    
export const myRestaurantsState: MyRestaurantsState = {
   myRestaurants: [],
   loading: false, 
   error: '',
}    
