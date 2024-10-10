import { User } from '@restaurant-booking/shared-types';

export interface UserProfileState {
  userProfile: User | null;
  loading: boolean;
  error: string;
}

export const userProfileState: UserProfileState = {
  userProfile: null,
  loading: false,
  error: '',
};
