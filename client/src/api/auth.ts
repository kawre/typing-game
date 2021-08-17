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

export const refreshToken = () =>
  auth.get("/auth/refresh-token").then((res) => res.data);

export const me = () => auth.get("/auth/me").then((res) => res.data);
