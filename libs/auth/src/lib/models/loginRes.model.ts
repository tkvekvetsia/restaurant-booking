import { User } from '@prisma/client';

export interface LoginResModel {
  token: string;
  user: Pick<User, 'name' & 'email' & 'phone'>;
}
