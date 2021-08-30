import { Token } from "../utils/Objects/Token";
import auth from "./axios";

export const login = (input: any) =>
  auth
    .put("/auth/login", input)
    .catch((error) => error.response)
    .then((res) => res.data);

export const register = (input: any) =>
  auth
    .post("/auth/register", input)
    .catch((error) => error.response)
    .then((res) => res.data);

export const logout = () =>
  auth
    .patch("/auth/logout")
    .catch((error) => error.response)
    .then((res) => {
      Token.clear();
      return res.data;
    });

export const me = () => auth.get("/auth/me").then((res) => res.data);
