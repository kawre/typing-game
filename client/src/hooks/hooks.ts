import { useMutation, useQuery } from "react-query";
import { login, me } from "../api/auth";
import { UserRes } from "../types/auth.types";

export const useMe = () => useQuery<UserRes>("me", me);

export const useLogin = () => useMutation("me", login);
