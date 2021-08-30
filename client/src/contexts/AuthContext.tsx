import { useState } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";
import { useHistory } from "react-router-dom";
import { logout, me } from "../api/auth";
import { User } from "../types/auth.types";
import { Token } from "../utils/Objects/Token";
// Types -------------------------------------------------------------------------

interface Context {
  user: User | undefined;
}

const AuthContext = createContext<Context>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};

// Component ---------------------------------------------------------------------
const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<Context["user"]>(undefined);

  const getMe = async () => {
    const res = await me();
    setUser(res);
  };

  useEffect(() => {
    getMe();
  }, []);

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {user !== undefined && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
