import {Route} from "@angular/router";

export const RESTAURANT_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./restaurants/restaurants.component').then(
        c => c.RestaurantsComponent
      ),
  },
];
