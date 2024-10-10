import { createReducer, on } from '@ngrx/store';
import { userProfileState } from './userProfile.state';
import { userProfileActions } from './userProfile.actions';

export const userProfileReducer = createReducer(
  userProfileState,
  on(userProfileActions.getUserProfile, (state, action) => ({
    ...state,
    userProfile: null,
    loading: true,
    error: '',
  })),
  on(userProfileActions.getUserProfileSuccess, (state, action) => ({
    ...state,
    userProfile: action.userProfile,
    loading: false,
    error: '',
  })),
  on(userProfileActions.getUserProfileFailure, (state, action) => ({
    ...state,
    userProfile: {},
    loading: false,
    error: action.error,
  }))
);
