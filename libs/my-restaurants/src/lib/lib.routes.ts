import { Route } from '@angular/router';
import { MyRestaurantsComponent } from './components/my-restaurants/my-restaurants.component';

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
];
