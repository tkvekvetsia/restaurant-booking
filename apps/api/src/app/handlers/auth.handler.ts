import { User } from '@restaurant-booking/shared-types';
import { AppError, comparePassword, createJWT, hashPassword } from '../utils';
import prisma from '../db/db';
import { TokenUser } from '../models/tokenUser.model';
import { getUser } from '../services/getUser.service';

export const registerUser = async (req, res, next) => {
  const user = (await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || null,
      password: await hashPassword(req.body.password),
    },
  })) as TokenUser;
  // const token = createJWT(user);

  res.status(201).json({
    status: 'success',
    data: null,
  });
};

export const login = async (req, res, next) => {
  const user = await getUser({ email: req.body.email, role: 'customer' });

  if (!user) {
    return next(new AppError('Inavlid email or password', 401));
  }

  const isValidPassword = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    return next(new AppError('Inavlid email or password', 401));
  }

  const token = createJWT(user);
  const responseUser: Pick<User, 'name' & 'email' & 'phone'> = {
    name: user.name,
    email: user.email,
    phone: user.phone,
  };

  res.status(200).json({
    status: 'success',
    errors: null,
    data: {
      user: responseUser,
      token,
    },
  });
};
