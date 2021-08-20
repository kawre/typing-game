import instance from "./axios";

export const getUser = (id: string) =>
  instance.get(`users/${id}`).then((res) => res.data);
