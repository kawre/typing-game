import React, { createContext, useContext, useEffect, useState } from "react";
// Types -------------------------------------------------------------------------

interface Stats {
  wpm: number;
  cpm: number;
  acc: number;
  time: number;
}

interface Context {
  stats: Stats;
  setStats: React.Dispatch<React.SetStateAction<Stats>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
}

const GameContext = createContext<Context>(null!);

export const useTyping = () => {
  return useContext(GameContext);
};

// Component ---------------------------------------------------------------------
const GameProvider: React.FC = ({ children }) => {
  const [stats, setStats] = useState({} as Context["stats"]);
  const [progress, setProgress] = useState(0);

  const value = {
    stats,
    setStats,
    setProgress,
    progress,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
