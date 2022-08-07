import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import TypingGame from "../pages/TypingGame/TypingGame";
import { useAuth } from "./AuthContext";
// Types -------------------------------------------------------------------------

// interface Stats {
//   wpm: number;
//   cpm: number;
//   acc: number;
//   time: number;
// }

interface Context {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
  setResults: React.Dispatch<React.SetStateAction<boolean>>;
  results: boolean;
  inGame: boolean;
  setInGame: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  time: number;
}

const GameContext = createContext<Context>(null!);

export const useTyping = () => {
  return useContext(GameContext);
};

interface Props extends React.PropsWithChildren {}

// Component ---------------------------------------------------------------------
const GameProvider: React.FC<Props> = ({ children }) => {
  const { id } = useParams<any>();
  const { user } = useAuth();

  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [results, setResults] = useState(false);
  const [inGame, setInGame] = useState(false);

  useEffect(() => {
    if (results) setInGame(false);
  }, [results]);

  const value = {
    setProgress,
    inGame,
    setInGame,
    progress,
    results,
    setResults,
    setTime,
    time,
  };

  return (
    <GameContext.Provider value={value}>
      <PrivateRoute>
        <TypingGame />
      </PrivateRoute>
    </GameContext.Provider>
  );
};

export default GameProvider;
