import { User } from '@restaurant-booking/shared-types';

export type TokenUser = Pick<User, 'name' | 'email' | 'phone' | 'id' | 'role'>;
