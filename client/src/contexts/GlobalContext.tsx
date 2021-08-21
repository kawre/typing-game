import { useState } from "react";
import { createContext, useContext } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);

  const value = { isPlaying, setIsPlaying };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
