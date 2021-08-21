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
  isPlaying: boolean;
  quote: string;
  setQuote: React.Dispatch<React.SetStateAction<string>>;
}

const GameContext = createContext<Context>(null!);

export const useTyping = () => {
  return useContext(GameContext);
};

// Component ---------------------------------------------------------------------
const GameProvider: React.FC = ({ children }) => {
  const [stats, setStats] = useState({} as Context["stats"]);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quote, setQuote] = useState("");

  // useEffect(() => {
  //   const interval = setInterval(
  //     () => setTime(parseFloat((time + 0.01).toFixed(2))),
  //     10
  //   );

  //   setStats({
  //     ...stats,
  //     time,
  //   });

  //   return () => clearInterval(interval);
  // }, [time]);

  const value = {
    isPlaying,
    stats,
    setStats,
    setProgress,
    progress,
    quote,
    setQuote,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
