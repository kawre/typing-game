import { createContext, useContext, useEffect, useState } from "react";
import { defaultConfig } from "../static/defaultConfig";
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
  // const [config, setConfig] = useState<Object>(
  //   JSON.parse(localStorage.getItem("config")!) || defaultConfig
  // );

  // useEffect(() => {
  //   localStorage.setItem("config", JSON.stringify(config));
  // }, [config]);

  // useEffect(() => {
  //   if (user) setConfig(user.config);
  // }, [user]);

  const value = {
    isPlaying,
    setIsPlaying,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
