import { Router } from "express";
import { authRouter } from "./auth.routes";
import { matchesRouter } from "./match.routes";
import { quotesRouter } from "./quote.routes";
import { usersRouter } from "./user.routes";

const routes = (app: Router) => {
  // users
  app.use("/users", usersRouter);

  // matches
  app.use("/matches", matchesRouter);

  // auth
  app.use("/auth", authRouter);

  // quotes
  app.use("/quotes", quotesRouter);
};

export default routes;
