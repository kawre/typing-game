import { compare } from "bcrypt";
import { Router } from "express";
import { createUser } from "../service/auth.service";
import { findUser } from "../service/user.service";
import { signJwt, verifyJwt } from "../utils/jwt.utils";

const auth = Router();

auth.put("/login", async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await findUser({ username });

    const valid = await compare(password, user.password);
    if (!valid) throw new Error();

    const token = signJwt({ ...user });

    res.locals.user = user;
    res.send({ success: true, accessToken: token });
  } catch (err: any) {
    return res.status(404).send({ success: false, error: "User not found" });
  }
});

auth.post("/register", async (req, res) => {
  try {
    const user = await createUser({ ...req.body });
    const token = signJwt({ ...user });

    res.locals.user = user;
    res.send({ success: true, accessToken: token });
  } catch (err: any) {
    if (err.code === "P2002") {
      return res
        .status(400)
        .json({ success: false, error: `${err.meta.target} already taken` });
    }

    res.send(err);
  }
});

auth.get("/me", (req, res) => {
  const accessToken = (req.headers["authorization"] || "").split(" ")[1];

  const { decoded, expired, valid } = verifyJwt(accessToken);
  if (!valid || !decoded) return res.send(null);
  const { password, ...user } = decoded;
  res.send(user);
});

auth.patch("/logout", (req, res) => {
  res.sendStatus(200);
});

export { auth as authRouter };
