import {
  APP_INITIALIZER,
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { EnvService, loadEnvFactory } from './core/services/env.service';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeature } from '@restaurant-booking/auth';
import { authInterceptor } from '@restaurant-booking/auth';
import { getUserProfileEffect, userProfileFeature } from '@restaurant-booking/userProfile';
import { provideEffects } from '@ngrx/effects';
import {  getMyRestaurantsEffect, myRestaurantsFeature } from '@restaurant-booking/my-restaurants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [EnvService],
      useFactory: loadEnvFactory,
    },

    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(authFeature),
    provideState(userProfileFeature),
    provideState(myRestaurantsFeature),
    provideEffects({getUserProfileEffect, getMyRestaurantsEffect})
  ],
};
