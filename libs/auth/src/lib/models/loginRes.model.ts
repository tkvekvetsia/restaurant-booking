import { User } from '@restaurant-booking/shared-types';

export interface LoginResModel {
  token: string;
  user: Pick<User, 'name' & 'email' & 'phone'>;
}
