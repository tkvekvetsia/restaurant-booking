import { createActionGroup, props } from '@ngrx/store';


export const authActions = createActionGroup({
  source: 'auth',
  events: {
    setIsLoggedIn: props<{ isLoggedIn: boolean }>(),
  },
});

