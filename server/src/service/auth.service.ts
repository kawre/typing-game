import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const { password } = params.args.data;
    params.args.data.password = await hash(password, 10);

    const result = await next(params);
    await prisma.config.create({ data: { userId: result.id } });

    return result;
  }

  return next(params);
});

export const createUser = async (data: any) => {
  const user = await prisma.user.create({ data });
  return user;
};
