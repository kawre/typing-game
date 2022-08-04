import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findUserById = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
};

export const findUser = async (elo: any) => {
  const user = await prisma.user.findFirst({ where: elo });
  return user;
};

export const createUser = async (xd: any) => {
  const user = await prisma.user.create({ data: xd });
  return user;
};
