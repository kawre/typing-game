import { Router } from "express";
import { findUserById } from "../service/user.service";
import { matchesRouter } from "./match.routes";
import { usersRouter } from "./user.routes";

const routes = (app: Router) => {
  // users
  app.use("/users", usersRouter);

  // matches
  app.use("/matches", matchesRouter);

  app.get("/auth/me", async (req, res) => {
    const me = await findUserById(2);
    res.json(me);
  });
};

export default routes;
