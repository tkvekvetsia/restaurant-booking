import { Route } from '@angular/router';

export const userProfileRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./userProfile/userProfile.component').then(
        c => c.UserProfileComponent
      ),
  },
];
