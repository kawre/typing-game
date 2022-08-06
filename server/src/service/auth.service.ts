import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const pass = params.args.data.password;
    params.args.data.password = await hash(pass, 10);
  }

  return next(params);
});

export const createUser = async (data: any) => {
  const user = await prisma.user.create({ data });
  return user;
};
