import { PrismaClient } from "@prisma/client";
import prisma from "../utils/client";

export const findUserById = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

export const findUser = async (elo: any) => {
  const user = await prisma.user.findFirstOrThrow({ where: elo });
  return user;
};

export const changeUserStatus = async (userId: any, status: boolean) => {
  return prisma.user.update({
    where: { id: userId },
    data: { isOnline: status },
  });
};

export const getConfig = async (userId: number) => {
  return prisma.config.findUnique({ where: { userId } });
};
