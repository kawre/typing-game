import { Config } from "../types/auth.types";
import instance from "./axios";

export const getUser = (id: string) =>
  instance.get(`users/${id}`).then((res) => res.data);

export const updateConfig = (id: string, input: any) =>
  instance
    .post(`users/${id}/config`, input)
    .then(({ data }) => data.config as Config);
