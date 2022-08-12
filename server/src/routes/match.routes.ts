import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

const matches = Router();
const prisma = new PrismaClient();

// find match
matches.get("/", async (req, res) => {
  const matches = await prisma.match.findMany({ include: { quote: true } });
  res.json(matches);
});

export { matches as matchesRouter };
