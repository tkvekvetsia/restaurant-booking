import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'restaurants',
    loadChildren: () =>
      import('@restaurant-booking/restaurants').then(r => r.restaurantsRoutes),
    title: 'Restaurants',
  },
];
