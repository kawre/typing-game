export interface User {
  tokenVersion: number;
  isOnline: boolean;
  _id: string;
  password: string;
  username: string;
  email: string;
  config: IConfig;
}

export interface IConfig {
  fontSize: number;
  fontFamily: string;
  darkMode: boolean;
}

export type UserRes = User | null;
