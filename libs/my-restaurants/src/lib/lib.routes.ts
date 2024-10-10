import { Route } from '@angular/router';
import { MyRestaurantsComponent } from './my-restaurants/my-restaurants.component';

export const myRestaurantsRoutes: Route[] = [
  {
     path: '', 
     loadComponent: () => import('./my-restaurants/my-restaurants.component').then(m => m.MyRestaurantsComponent)
  },
];
