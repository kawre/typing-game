import { IConfig } from "../types/auth.types";
import instance from "./axios";

export const getUser = (id: string) =>
  instance.get(`users/${id}`).then((res) => res.data);

export const updateConfig = (id: string, input: any) =>
  instance
    .post(`users/${id}/config`, input)
    .then(({ data }) => data.config as IConfig);

export const getConfig = async (id: number) => {
  return instance.get(`users/${id}/config`).then((res) => res.data);
};
