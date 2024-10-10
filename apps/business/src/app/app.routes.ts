import { Route } from '@angular/router';
import {
  authGuard,
  AuthStatusHelperService,
  notAuthGuard,
} from '@restaurant-booking/auth';
import { inject } from '@angular/core';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: () => {
      const authStatusHelperService = inject(AuthStatusHelperService);
      return authStatusHelperService.isUserLoggedIn()
        ? 'profile'
        : 'auth/login';
    },
    pathMatch: 'full',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('@restaurant-booking/auth').then(a => a.authRoutes),
    canMatch: [notAuthGuard],
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('@restaurant-booking/userProfile').then(c => c.userProfileRoutes),
    canMatch: [authGuard],
  },
];
