import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
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
  game: Socket;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  time: number;
}

const GameContext = createContext<Context>(null!);

export const useTyping = () => {
  return useContext(GameContext);
};

// Component ---------------------------------------------------------------------
const GameProvider: React.FC = ({ children }) => {
  const { id } = useParams<any>();
  const { user } = useAuth();

  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(0);
  const [results, setResults] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [game, setGame] = useState<Context["game"]>();

  useEffect(() => {
    const newSocket = io("http://localhost:5000");

    setGame(newSocket);

    return () => {
      newSocket.close();
    };
  }, [setGame]);

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
    game: game!,
    setTime,
    time,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
