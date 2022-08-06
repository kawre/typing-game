import { PrismaClient } from "@prisma/client";
import { match } from "assert";
import { Socket } from "socket.io";
import { io } from "../app";
import { findMatch, matches, saveResults } from "../service/match.service";
import { changeUserStatus } from "../service/user.service";

const prisma = new PrismaClient();

const socketHandler = (socket: Socket) => {
  // @ts-ignore
  const userId = parseInt(socket.handshake.headers["userid"]);
  if (userId) changeUserStatus(userId, true);

  socket.on("room:find", async (id: string) => {
    const room = await findMatch(parseInt(id), socket);
    socket.emit("room:found", room);
  });

  socket.on("room:join", async (id: string) => {
    const match = matches.find((m) => m.matchId === id);
    if (!match) {
      return socket.emit("error", "404");
    } else if (!match.available) {
      return socket.emit("error", "503");
    }

    socket.join(id);
    await prisma.match.update({
      where: { id: match.matchId },
      data: { usersId: { push: userId } },
    });
    const user = await prisma.user.findUnique({ where: { id: userId } });

    match.state.push({
      user: user!,
      wpm: 0,
      progress: 0,
      matchId: match.matchId,
    });

    io.to(id).emit("room:state", match.state);
    socket.emit("room:quote", match.quote);
  });

  socket.on("room:leave", (id: string) => {
    socket.leave(id);
  });

  socket.on("room:user:state", async ({ matchId, data }) => {
    const match = matches.find((m) => m.matchId === matchId);
    if (!match) return;

    const idx = match.state.findIndex((s) => s.user.id === userId);
    match.state[idx] = { ...match.state[idx], ...data };

    if (data.progress === 100) {
      match.finished++;
      match.state[idx].place = match.finished;
      const results = await saveResults(match.state[idx]);
      console.log(results);
      socket.emit("room:user:results", results);
    }

    io.to(matchId).emit("room:state", match.state);
  });

  socket.on("disconnect", () => {
    if (userId) changeUserStatus(userId, true);
  });
};

export default socketHandler;
