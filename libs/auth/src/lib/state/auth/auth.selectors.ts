import { AuthState } from './auth.state';
import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { authReducer } from './auth.reducer';

export const AUTH_FEATURE_KEY = 'auth';
export const selectAuthState =
  createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoggedIn
);

export const authFeature = createFeature({
  name: AUTH_FEATURE_KEY,
  reducer: authReducer,
});
