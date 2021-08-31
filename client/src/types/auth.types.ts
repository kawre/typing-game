export interface User {
  tokenVersion: number;
  isOnline: boolean;
  _id: string;
  password: string;
  username: string;
  email: string;
  config: Config;
}

export interface Config {
  fontSize: number;
  fontFamily: string;
  theme: string;
}

export type UserRes = User | null;
