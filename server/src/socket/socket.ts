import { Socket } from "socket.io";
import { findMatch, matches } from "../service/match.service";

const socketHandler = (socket: Socket) => {
  console.log("a user connected");

  socket.on("room:find", async (id: string) => {
    const room = await findMatch(parseInt(id), socket);
    console.log("elo");
    socket.emit("room:found", room);
  });

  socket.on("room:join", async (id: string) => {
    socket.join(id);
    const match = matches.find((m) => m.matchId === id);
    socket.emit("room:user:new", "sie");
    socket.emit("room:state", match);
  });

  socket.on("room:user:state", async (id: string) => {
    const match = matches.find((m) => m.matchId === id);
    socket.emit("room:state", match);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};

export default socketHandler;
