import { createReducer, on } from '@ngrx/store';
import { authActions } from './auth.actions';
import { authState } from './auth.state';

export const authReducer = createReducer(
  authState,
  on(authActions.setIsLoggedIn, (state, action) => {
    return {
      ...state,
      isLoggedIn: action.isLoggedIn,
    };
  })
);
