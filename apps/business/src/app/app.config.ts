import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { EnvService, loadEnvFactory } from './core/services/env.service';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeature, authInterceptor } from '@restaurant-booking/auth';
import {
  getUserProfileEffect,
  userProfileFeature,
} from '@restaurant-booking/userProfile';
import { provideEffects } from '@ngrx/effects';
import {
  getMyRestaurantsEffect,
  myRestaurantsFeature,
} from '@restaurant-booking/my-restaurants';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { errorHandlerInterceptor } from '@restaurant-booking/shared-ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
      withComponentInputBinding()
    ),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, errorHandlerInterceptor])
    ),

    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [EnvService],
      useFactory: loadEnvFactory,
    },
    MessageService,
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(authFeature),
    provideState(userProfileFeature),
    provideState(myRestaurantsFeature),
    provideEffects({ getUserProfileEffect, getMyRestaurantsEffect }),
  ],
};
