import { Route } from '@angular/router';

export const authRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then(c => c.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.component').then(
            c => c.RegisterComponent
          ),
      },
    ],
  },
];
