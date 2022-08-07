import { PrismaClient, User } from "@prisma/client";
import { Socket } from "socket.io";
import { io } from "../app";
import { findMatch, matches, saveResults } from "../service/match.service";
import { changeUserStatus } from "../service/user.service";

const prisma = new PrismaClient();

const socketHandler = async (socket: Socket) => {
  // @ts-ignore
  const userId = parseInt(socket.handshake.headers["userid"]);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.id) changeUserStatus(user.id, true);

  socket.on("room:find", async (userId: string) => {
    const room = await findMatch(parseInt(userId));
    socket.emit("room:found", room);
  });

  socket.on("room:join", async (id: string) => {
    const match = matches[id];

    if (!match) {
      return socket.emit("error", "404");
    }
    if (!match.available) {
      return socket.emit("error", "503");
    }

    const userState = match.state.find((s) => s.user.id === userId);
    if (!userState) {
      match.state.push({
        user: user!,
        wpm: 0,
        progress: 0,
        matchId: match.id,
      });
    }

    socket.join(id);
    io.to(id).emit("room:state", match.state);
    socket.emit("room:quote", match.quote);
  });

  socket.on("room:leave", (id: string) => {
    socket.leave(id);
  });

  socket.on("room:user:state", async ({ matchId, data }) => {
    const match = matches[matchId];
    if (!match) return;

    const idx = match.state.findIndex((s) => s.user.id === userId);
    data.wpm = Math.round(data.wpm);
    match.state[idx] = { ...match.state[idx], ...data };

    if (data.progress === 100) {
      match.finished++;
      match.state[idx].place = match.finished;
      io.to(match.id).emit("room:state", match.state);

      saveResults(match.state[idx]).then((results) => {
        socket.emit("room:user:results", results);
      });
    }
  });

  socket.on("disconnect", () => {
    if (userId) changeUserStatus(userId, true);
  });
};

export default socketHandler;
