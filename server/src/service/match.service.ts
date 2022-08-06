import { PrismaClient, Results, User } from "@prisma/client";
import { match } from "assert";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { io } from "../app";

const prisma = new PrismaClient();

interface Match {
  users: number[];
  matchId: string;
  createdAt: Date;
  quote: string;
  state: State[];
  available: boolean;
  finished: number;
}

interface State {
  user: User;
  wpm: number;
  progress: number;
  matchId: string;
  place?: number;
}

export const matches = [] as Match[];

prisma.$use(async (params, next) => {
  if (params.model === "Match" && params.action === "create") {
    console.log(params.args.data);
    const quotesCount = await prisma.quote.count();
    const skip = Math.floor(Math.random() * quotesCount);
    const quote = await prisma.quote.findMany({ take: 1, skip });
    params.args.data.quoteId = quote[0].id;
  }

  return next(params);
});

export const createRoom = async (id: number, socket: Socket) => {
  const match = await prisma.match.create({
    data: { id: uuidv4() },
    include: { quote: true },
  });

  const idx = matches.push({
    users: [id],
    quote: match.quote.text,
    matchId: match.id,
    createdAt: match.createdAt,
    state: [],
    available: true,
    finished: 0,
  });

  let s = 0;
  const interval = setInterval(() => {
    io.to(match.id).emit("room:time", s);

    if (s === 4) {
      matches[idx - 1].available = false;
    }

    if (s === 6) {
      io.to(match.id).emit("room:start", "start");
    }

    if (s === 360) {
      io.to(match.id).emit("room:end", "end");
      matches.splice(idx - 1, 1);
      clearInterval(interval);
    }

    s++;
  }, 1000);

  return matches[idx - 1].matchId;
};

export const findMatch = async (id: number, socket: Socket) => {
  const latestMatch = matches[matches.length - 1];

  if (latestMatch && latestMatch.users.length <= 4 && latestMatch.available) {
    latestMatch.users.push(id);
    return latestMatch.matchId;
  } else {
    return createRoom(id, socket);
  }
};

export const saveResults = async (data: any) => {
  return prisma.results.create({
    data: {
      wpm: data.wpm,
      userId: data.user.id,
      place: data.place,
      matchId: data.matchId,
    },
  });
};
