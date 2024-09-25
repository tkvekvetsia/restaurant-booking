import { RestaurantsComponent } from './restaurants/restaurants.component';
import { Route } from '@angular/router';

export const restaurantsRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./restaurants/restaurants.component').then(
        c => c.RestaurantsComponent
      ),
  },
];
