import { Route } from '@angular/router';
import { MyRestaurantsComponent } from './components/my-restaurants/my-restaurants.component';

export const myRestaurantsRoutes: Route[] = [
  {
     path: '', 
     loadComponent: () => import('./components/my-restaurants/my-restaurants.component').then(m => m.MyRestaurantsComponent)
  },
  {
    path:'add',
  }
];
