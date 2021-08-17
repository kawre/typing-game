import { useState } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { me } from "../api/auth";
import { User } from "../types/auth.types";
// Types -------------------------------------------------------------------------

interface Context {
  user: User;
}

const AuthContext = createContext<Context>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};

// Component ---------------------------------------------------------------------
const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState({} as User);

  const getMe = async () => {
    const res = await me();
    console.log(res);
    setUser(res);
  };

  useEffect(() => {
    getMe();
  }, []);

  const value = {
    user,
  };

  if (!user) return null;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
