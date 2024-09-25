import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'restaurants',
    loadChildren: () =>
      import('@restaurant-booking/restaurants').then(r => r.RESTAURANT_ROUTES),
    title: 'Restaurants',
  },
];
