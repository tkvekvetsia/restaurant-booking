import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@restaurant-booking/shared-types';

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    getUserProfile: emptyProps(),
    getUserProfileSuccess: props<{ userProfile: User }>(),
    getUserProfileFailure: props<{ error: string }>(),
  },
});
