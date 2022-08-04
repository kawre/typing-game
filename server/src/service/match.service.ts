import { PrismaClient } from "@prisma/client";
import { match } from "assert";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

interface Match {
  users: number[];
  matchId: string;
  createdAt: Date;
}

export const matches = [] as Match[];

prisma.$use(async (params, next) => {
  if (params.model === "Match" && params.action === "create") {
    const quotesCount = await prisma.quote.count();
    const skip = Math.floor(Math.random() * quotesCount);
    const quote = await prisma.quote.findMany({ take: 1, skip });
    params.args.data.quoteId = quote[0].id;
  }

  return next(params);
});

export const createRoom = async (id: number, socket: Socket) => {
  const match = await prisma.match.create({ data: { id: uuidv4() } });

  const idx = matches.push({
    users: [id],
    matchId: match.id,
    createdAt: match.createdAt,
  });

  // matchHandler(socket);

  return matches[idx - 1].matchId;
};

// const matchHandler = (socket: Socket) => {};

export const findMatch = async (id: number, socket: Socket) => {
  const latestMatch = matches[matches.length - 1];

  if (latestMatch && latestMatch.users.length <= 4) {
    latestMatch.users.push(id);
    return latestMatch.matchId;
  } else {
    return createRoom(id, socket);
  }
};
