import prisma from "../utils/client";
import { Request, Response, Router } from "express";

const matches = Router();

// find match
matches.get("/", async (req, res) => {
  const matches = await prisma.match.findMany({ include: { quote: true } });
  res.json(matches);
});

export { matches as matchesRouter };
