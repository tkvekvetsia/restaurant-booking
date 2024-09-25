import { User } from '@restaurant-booking/shared-types';
import { AppError, comparePassword, createJWT, hashPassword } from '../utils';
import prisma from '../db/db';

export const registerUser = async (req, res, next) => {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || null,
      password: await hashPassword(req.body.password),
    },
  });
  const token = createJWT(user);

  res.status(200).json({
    status: 'success',
    data: {
      token,
    },
  });
};

export const login = async (req, res, next) => {
  const user = (await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })) as {
    name: string;
    email: string;
    phone: string | null;
    role: string;
    password: string;
  };

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
