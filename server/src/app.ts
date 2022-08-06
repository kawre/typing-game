import express, { Router } from "express";
import { Server } from "socket.io";
import routes from "./routes/routes";
import http from "http";
import socketHandler from "./socket/socket";
import cors from "cors";

const port = 5000;

const app = express();
const server = http.createServer(app);
export const io = new Server(server, { cors: { origin: "*" } });

// middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

// io
io.on("connection", socketHandler);

// listen
server.listen(port, () => {
  console.log(`app running on port ${port}`);
  const router = Router();
  app.use("/api", router);
  routes(router);
});
