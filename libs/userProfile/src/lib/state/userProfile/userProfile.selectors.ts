import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { UserProfileState } from './userProfile.state';
import { userProfileReducer } from './userProfile.reducer';

export const USER_PROFILE_FEATURE_KEY = 'userProfile';

export const selectUserProfileState = createFeatureSelector<UserProfileState>(
  USER_PROFILE_FEATURE_KEY
);

export const selectUserProfile = createSelector(
  selectUserProfileState,
  (state: UserProfileState) => state.userProfile
);

export const selectUserProfileLoading = createSelector(
  selectUserProfileState,
  (state: UserProfileState) => state.loading
);

export const selectUserProfileError = createSelector(
  selectUserProfileState,
  (state: UserProfileState) => state.error
);

export const userProfileFeature = createFeature({
  name: USER_PROFILE_FEATURE_KEY,
  reducer: userProfileReducer,
});
