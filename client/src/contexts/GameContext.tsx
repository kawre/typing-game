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
  game: Socket<DefaultEventsMap, DefaultEventsMap>;
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
  const [results, setResults] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [game, setGame] = useState<Context["game"]>();

  useEffect(() => {
    if (!user) return;
    const game = io("http://localhost:5000/games", {
      withCredentials: true,
      extraHeaders: { room: id, user: user._id },
    });
    setGame(game);

    return () => {
      game.disconnect();
    };
  }, [user]);

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
  };

  return (
    <GameContext.Provider value={value}>
      {game && children}
    </GameContext.Provider>
  );
};

export default GameProvider;
