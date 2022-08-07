import { PrismaClient, User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { io } from "../app";

const prisma = new PrismaClient();

interface Match {
  users: number[];
  id: string;
  quote: string;
  state: State[];
  finished: number;
}

interface State {
  user: User;
  wpm: number;
  progress: number;
  matchId: string;
  place?: number;
}

export const matches = {} as { [key: string]: Match };
export const queue: string[] = [];

prisma.$use(async (params, next) => {
  if (params.model === "Match" && params.action === "create") {
    const quotesCount = await prisma.quote.count();
    const skip = Math.floor(Math.random() * quotesCount);
    const quote = await prisma.quote.findMany({ take: 1, skip });
    params.args.data.quoteId = quote[0].id;
  }

  return next(params);
});

export const createRoom = async (userId: number) => {
  const { id, quote } = await prisma.match.create({
    data: { id: uuidv4() },
    include: { quote: true },
  });

  matches[id] = {
    users: [userId],
    quote: quote.text,
    id,
    state: [],
    finished: 0,
  };
  queue.push(id);
  const match = matches[id];

  let s = 0;
  const interval = setInterval(async () => {
    io.to(match.id).emit("room:time", s);
    io.to(match.id).emit("room:state", match.state);

    if (s === 4) {
      const queueIdx = queue.findIndex((q) => q === id);
      queue.splice(queueIdx, 1);
    }

    if (s === 6) {
      io.to(match.id).emit("room:start", "start");
    }

    if (s === 306) {
      clearInterval(interval);
      io.to(match.id).emit("room:end", "end");
      await prisma.match.update({
        where: { id: match.id },
        data: { usersId: match.users },
      });
      delete matches[match.id];
    }

    s++;
  }, 1000);

  return match.id;
};

export const findMatch = async (userId: number) => {
  const latestMatch = matches[queue[0]];

  if (latestMatch && latestMatch.users.length <= 4) {
    latestMatch.users.push(userId);
    return latestMatch.id;
  } else {
    return createRoom(userId);
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
