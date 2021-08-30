export interface User {
  tokenVersion: number;
  isOnline: boolean;
  _id: string;
  password: string;
  username: string;
  email: string;
}

export type UserRes = User | undefined | null;
