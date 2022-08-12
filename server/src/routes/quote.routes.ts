import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const quotes = Router();
const prisma = new PrismaClient();

// create quote
quotes.post("/", async (req, res) => {
  const { text } = req.body;
  const quote = await prisma.quote.create({ data: { text } });
  res.send(quote);
});

// all quotes
quotes.get("/", async (req, res) => {
  const quotes = await prisma.quote.findMany();
  res.send(quotes);
});

// delete quote
quotes.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.results.deleteMany({ where: { match: { quoteId: id } } });
  await prisma.history.deleteMany({
    where: { results: { match: { quoteId: id } } },
  });
  await prisma.match.deleteMany({ where: { quoteId: id } });
  await prisma.quote.delete({ where: { id } });
  res.send("deleted");
});

// top 5 results
quotes.get("/:id/top5", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const top5 = await prisma.results.findMany({
      where: { match: { quoteId: id } },
      orderBy: { wpm: "desc" },
      include: { user: true },
      take: 5,
    });
    res.send(top5);
  } catch (err) {
    res.send("err");
  }
});

export { quotes as quotesRouter };
