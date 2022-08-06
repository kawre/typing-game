import { Router } from "express";
import { findUserById } from "../service/user.service";
import { authRouter } from "./auth.routes";
import { matchesRouter } from "./match.routes";
import { usersRouter } from "./user.routes";

const routes = (app: Router) => {
  // users
  app.use("/users", usersRouter);

  // matches
  app.use("/matches", matchesRouter);

  // auth
  app.use("/auth", authRouter);
};

export default routes;
