import { PrismaClient, Quote, User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { io } from "../app";
import { emitState } from "../utils/emitState";

const prisma = new PrismaClient();

export interface Match {
  users: number[];
  id: string;
  quote: string;
  state: Map<number, State>;
  finished: number;
}

export interface State {
  user: User;
  wpm: number;
  acc: number;
  progress: number;
  matchId: string;
  place?: number;
}

export const matches = new Map<string, Match>();
export const queue: string[] = [];

prisma.$use(async (params, next) => {
  if (params.model === "Match" && params.action === "create") {
    const quote =
      (await prisma.$queryRaw`SELECT * FROM "Quote" ORDER BY random() LIMIT 1;
    `) as Quote[];
    params.args.data.quoteId = quote[0].id;
  }

  return next(params);
});

export const createRoom = async (userId: number) => {
  const { id: matchId, quote } = await prisma.match.create({
    data: { id: uuidv4() },
    include: { quote: true },
  });

  matches.set(matchId, {
    users: [userId],
    quote: quote.text,
    id: matchId,
    state: new Map(),
    finished: 0,
  });
  queue.push(matchId);
  const match = matches.get(matchId)!;

  let s = 0;
  const interval = setInterval(async () => {
    io.to(match.id).emit("room:time", s);
    io.to(match.id).emit("room:state", emitState(match.state));

    if (s === 4) {
      const queueIdx = queue.findIndex((q) => q === matchId);
      queue.splice(queueIdx, 1);
    }

    if (s === 6) {
      io.to(match.id).emit("room:start", "start");
    }

    if (s === 186) {
      clearInterval(interval);
      io.to(match.id).emit("room:end");
      await prisma.match.update({
        where: { id: match.id },
        data: { usersId: match.users },
      });
      matches.delete(match.id);
    }

    s++;
  }, 1000);

  return match.id;
};

export const findMatch = async (userId: number) => {
  const latestMatch = matches.get(queue[0]);

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
      acc: data.acc,
    },
  });
};
