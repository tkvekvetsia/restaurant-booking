import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'restaurants',
    loadChildren: () =>
      import('@restaurant-booking/restaurants').then(r => r.restaurantsRoutes),
    title: 'Restaurants',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@restaurant-booking/auth').then(a => a.authRoutes),
  },
];
