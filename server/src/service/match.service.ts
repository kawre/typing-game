import { PrismaClient, Quote, User } from "@prisma/client";
import { io } from "../app";
import { emitState } from "../utils/emitState";
import prisma from "../utils/client";

export interface Match {
  users: Set<number>;
  id: string;
  quote: string;
  state: Map<number, State>;
  finished: number;
  time: number;
  createdAt: Date;
}

export interface State {
  user: User;
  correctInputs: number;
  allCorrectInputs: number;
  allInputs: number;
  matchId: string;
  place?: number;
  wpm: number;
  acc: number;
  progress: number;
}

export const matches = new Map<string, Match>();
// export const queue = new Set<string>();
export let queue = "";

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
  const {
    id: matchId,
    quote,
    createdAt,
  } = await prisma.match.create({
    data: {},
    include: { quote: true },
  });

  matches.set(matchId, {
    users: new Set([userId]),
    quote: quote.text,
    id: matchId,
    state: new Map(),
    finished: 0,
    time: -6,
    createdAt,
  });
  queue = matchId;

  const interval = setInterval(async () => {
    const match = matches.get(matchId)!;
    match.time++;
    const s = match.time;
    io.to(match.id).emit("room:time", s);

    if (s === 0) {
      io.to(match.id).emit("room:start", "start");
    }

    if (s > 0) {
      io.to(match.id).emit("room:state", emitState(match));
    }

    if (s === -2) {
      queue = "";
    }

    if (s === 180) {
      clearInterval(interval);
      io.to(match.id).emit("room:end");
      prisma.match
        .update({
          where: { id: match.id },
          data: { usersId: Array.from(match.users) },
        })
        .then(() => matches.delete(match.id));
    }

    matches.set(matchId, { ...match, time: s });
  }, 1000);

  return matchId;
};

export const findMatch = async (userId: number) => {
  const latestMatch = matches.get(queue);

  if (latestMatch && latestMatch.users.size <= 4) {
    latestMatch.users.add(userId);
    return latestMatch.id;
  } else {
    return createRoom(userId);
  }
};

export const saveResults = async (data: any) => {
  const history = await prisma.history.create({
    data: { history: data.history },
  });

  const { wpm, acc, place, user, matchId } = data.finalState;
  return prisma.results.create({
    data: {
      wpm,
      acc,
      place,
      userId: user.id,
      matchId,
      historyId: history.id,
    },
    include: { history: true },
  });
};
