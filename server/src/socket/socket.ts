import { PrismaClient, User } from "@prisma/client";
import { Socket } from "socket.io";
import { io } from "../app";
import {
  findMatch,
  matches,
  queue,
  saveResults,
} from "../service/match.service";
import { changeUserStatus } from "../service/user.service";
import { emitState } from "../utils/emitState";

const prisma = new PrismaClient();

const socketHandler = async (socket: Socket) => {
  // @ts-ignore
  const userId = parseInt(socket.handshake.headers["userid"]);
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user) {
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
          user,
          wpm: 0,
          acc: 0,
          progress: 0,
          matchId: match.id,
        });
      }

      socket.join(id);
      io.to(id).emit("room:state", emitState(match.state));
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

      let emit = false;
      if (userState.progress === 100) {
        match.finished++;
        userState.place = match.finished;
        emit = true;

        saveResults(userState).then((results) => {
          socket.emit("room:user:results", { ...results, finished: true });
        });
      }

      match.state.set(userId, userState);
      if (emit) io.to(match.id).emit("room:state", emitState(match.state));
      matches.set(match.id, match);
    });
  }

  socket.on("room:user:timeout", (data) => {
    socket.emit("room:user:results", { ...data, finished: false });
  });

  socket.on("disconnect", () => {
    // if (userId) changeUserStatus(userId, true);
  });
};

export default socketHandler;
