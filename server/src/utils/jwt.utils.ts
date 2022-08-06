import { User } from "@prisma/client";
import { sign, verify, SignOptions } from "jsonwebtoken";

const key = process.env["JWT_KEY"] as string;

// create a session
export const signJwt = (payload: object, options?: SignOptions) => {
  return sign(payload, key, { expiresIn: "1y", ...options });
};

// verify token
export const verifyJwt = (token: string) => {
  try {
    const decoded = verify(token, key) as User;
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};
