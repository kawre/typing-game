import { createContext, useContext } from "react";
import { useMe } from "../hooks/hooks";
import { UserRes } from "../types/auth.types";
// Types -------------------------------------------------------------------------

interface Context {
  user: UserRes;
}

interface Props extends React.PropsWithChildren {}

const AuthContext = createContext<Context>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};

// Component ---------------------------------------------------------------------
const AuthProvider: React.FC<Props> = ({ children }) => {
  const { data: user } = useMe();

  const value = { user: user! };

  return (
    <AuthContext.Provider value={value}>
      {user !== undefined && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
