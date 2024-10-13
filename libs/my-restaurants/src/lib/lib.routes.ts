import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { getRestaurantDetailsByIdEffect } from './state/my-restaurants/myRestaurants.effects';
// import { MyRestaurantsComponent } from './components/my-restaurants/my-restaurants.component';

export const myRestaurantsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./components/my-restaurants/my-restaurants.component').then(
        c => c.MyRestaurantsComponent
      ),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./components/add-restaurant/add-restaurant.component').then(
        c => c.AddRestaurantComponent
      ),
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import(
        './components/restaurant-details/restaurant-details.component'
      ).then(c => c.RestaurantDetailsComponent),
      providers :[
        provideEffects({getRestaurantDetailsByIdEffect})
      ]
  },
];
