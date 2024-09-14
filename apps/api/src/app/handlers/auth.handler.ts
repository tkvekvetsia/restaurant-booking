import { User } from '@restaurant-booking/shared-types';
import { createJWT, hashPassword } from '../utils';
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
    token: token,
  });
};
