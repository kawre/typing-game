import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { findUser, findUserById } from "../service/user.service";

const users = Router();
const prisma = new PrismaClient();

// get all users
users.get("/", async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany();

  res.json(allUsers);
});

// get one user by id
users.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await findUserById(id);
  res.json(user);
});

export { users as usersRouter };
