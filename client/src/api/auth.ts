import { useHistory } from "react-router-dom";
import { UserRes } from "../types/auth.types";
import { Token } from "../utils/Objects/Token";
import auth from "./axios";

export const login = (input: any) =>
  auth
    .put("/auth/login", input)
    .catch((err) => err.response)
    .then((res) => {
      return res.data;
    });

export const register = (input: any) =>
  auth
    .post("/auth/register", input)
    .catch((err) => err.response)
    .then((res) => res.data);

export const logout = () =>
  auth
    .patch("/auth/logout")
    .catch((err) => err.response)
    .then(({ data }) => {
      if (data) Token.clear();
      return data;
    });

export const me = (): Promise<UserRes> =>
  auth.get("/auth/me").then((res) => res.data);
