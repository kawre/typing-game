import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
// Types -------------------------------------------------------------------------

interface Context {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isPlaying: boolean;
}

const GlobalContext = createContext<Context>(null!);

export const useGlobal = () => {
  return useContext(GlobalContext);
};

// Component ---------------------------------------------------------------------
const GlobalProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [config, setConfig] = useState(
    localStorage.getItem("config") || {
      darkMode: true,
      fontFamily: "Fira Code",

      fontSize: 1.25,
    }
  );

  useEffect(() => {
    console.log("elo");
  }, [config]);

  useEffect(() => {
    if (user) setConfig(user.config);
  }, [user]);

  const value = {
    isPlaying,
    setIsPlaying,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
