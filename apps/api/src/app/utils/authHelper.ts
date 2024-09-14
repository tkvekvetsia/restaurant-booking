import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { environment } from '../config/environment';
import { User } from '@restaurant-booking/shared-types';

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const createJWT = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, phone: user.phone },
    environment.jwtSecret
  );
};
