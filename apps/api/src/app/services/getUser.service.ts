import { TokenUser } from '../models/tokenUser.model';
import prisma from '../db/db';
import { Prisma } from '@prisma/client';

export const getUser = async (where: Prisma.UserWhereUniqueInput) => {
  return prisma.user.findUnique({
    where,
  }) as TokenUser & {
    name: string;
    password: string;
  };
};
