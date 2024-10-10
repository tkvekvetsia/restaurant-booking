import { User } from '@restaurant-booking/shared-types';
import prisma from '../db/db';
import { AppError } from '../utils';

export const getUser = async (req, res, next) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const userDto = toUserDto(user as User);

  res.status(200).json({
    status: 'success',
    message: 'User found',
    data: {
      user: userDto,
    },
  });
};

const toUserDto = (user: User): User => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    profilePic: user.profilePic || null,
  };
};
