import { Router } from "express";
import { findUserById, getConfig } from "../service/user.service";
import prisma from "../utils/client";

const users = Router();

// get all users
users.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();

  res.json(allUsers);
});

// get one user by id
users.get("/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await findUserById(userId);
  res.json(user);
});

// get user config
users.get("/:userId/config", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const config = await getConfig(userId);
  res.send(config);
});

export { users as usersRouter };
