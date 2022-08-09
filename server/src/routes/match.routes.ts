import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

const matches = Router();
const prisma = new PrismaClient();

// find match
matches.get("/", async (req: Request, res: Response) => {
  const matches = await prisma.match.findMany({ include: { quote: true } });
  res.json(matches);
});

matches.post("/quote", async (req, res) => {
  const { text } = req.body;
  const quote = await prisma.quote.create({ data: { text } });
  res.send(quote);
});

export { matches as matchesRouter };
