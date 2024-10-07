import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@restaurant-booking/auth').then(a => a.authRoutes),
  },
];
