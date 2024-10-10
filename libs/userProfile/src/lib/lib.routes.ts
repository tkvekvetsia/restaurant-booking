import { Route } from '@angular/router';

export const userProfileRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./userProfile/userProfile.component').then(
        c => c.UserProfileComponent
      ),
  },
];
