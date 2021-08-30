import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { me } from "../api/auth";
import { useMe } from "../hooks/hooks";
import { UserRes } from "../types/auth.types";
// Types -------------------------------------------------------------------------

interface Context {
  user: UserRes;
}

const AuthContext = createContext<Context>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};

// Component ---------------------------------------------------------------------
const AuthProvider: React.FC = ({ children }) => {
  const { data: user } = useMe();

  const value = { user };

  return (
    <AuthContext.Provider value={value}>
      {user !== undefined && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
