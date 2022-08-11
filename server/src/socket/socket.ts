import { PrismaClient } from "@prisma/client";
import { Socket } from "socket.io";
import { io } from "../app";
import {
  findMatch,
  matches,
  queue,
  saveResults,
} from "../service/match.service";
import { emitState } from "../utils/emitState";

const prisma = new PrismaClient();

const socketHandler = async (socket: Socket) => {
  // @ts-ignore
  const userId = parseInt(socket.handshake.headers["userid"]);
  const user = await prisma.user.findUnique({ where: { id: userId } });

  // await prisma.config.deleteMany();
  // await prisma.results.deleteMany();
  // await prisma.user.deleteMany();

  // changeUserStatus(user.id, true);

  socket.on("room:find", async (userId: string) => {
    const room = await findMatch(parseInt(userId));
    socket.emit("room:found", room);
  });

  socket.on("room:join", async (id: string) => {
    const match = matches.get(id);

    if (!match) {
      return socket.emit("error", "404");
    }

    if (!queue.find((id) => id === match.id)) {
      return socket.emit("error", "503");
    }

    if (!match.state.get(userId)) {
      match.state.set(userId, {
        user: user!,
        matchId: match.id,
        allCorrectInputs: 0,
        allInputs: 0,
        correctInputs: 0,
        wpm: 0,
        acc: 0,
        progress: 0,
      });
    }

    socket.join(id);
    io.to(id).emit("room:state", emitState(match));
    socket.emit("room:time", match.time);
    socket.emit("room:quote", match.quote);
  });

  socket.on("room:leave", (id: string) => {
    socket.leave(id);
  });

  socket.on("room:user:state", ({ matchId, data }) => {
    const match = matches.get(matchId);
    if (!match) return;

    const state = match.state.get(userId);
    if (!state) return;
    const userState = { ...state, ...data };

    match.state.set(userId, userState);
    matches.set(match.id, match);
  });

  socket.on("room:user:finish", (matchId) => {
    const match = matches.get(matchId);
    if (!match) return;

    const userState = match.state.get(userId);
    if (!userState) return;

    const timestampInMs = new Date(match.createdAt).getTime() + 6000;
    const endTime = (Date.now() - timestampInMs) / 1000;

    match.finished++;
    userState.place = match.finished;
    const { correctInputs, allInputs, allCorrectInputs } = userState;
    const wpm = correctInputs / 5 / (endTime / 60);
    const acc = (allCorrectInputs / allInputs) * 100;

    const finalState = {
      ...userState,
      wpm,
      acc,
      progress: 100,
    };

    saveResults(finalState).then((results) => {
      socket.emit("room:user:results", { ...results, finished: true });
    });

    match.state.set(userId, finalState);
    matches.set(match.id, match);
    io.to(matchId).emit("room:state", emitState(match));
  });

  socket.on("room:user:timeout", (data) => {
    socket.emit("room:user:results", { ...data, finished: false });
  });

  socket.on("disconnect", () => {
    // if (userId) changeUserStatus(userId, true);
  });
};

export default socketHandler;
