import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
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
  setResults: React.Dispatch<React.SetStateAction<boolean>>;
  results: boolean;
  inGame: boolean;
  setInGame: React.Dispatch<React.SetStateAction<boolean>>;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setPlayAgain: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
}

const GameContext = createContext<Context>(null!);

export const useTyping = () => {
  return useContext(GameContext);
};

interface Props extends React.PropsWithChildren {}

// Component ---------------------------------------------------------------------
const GameProvider: React.FC<Props> = ({ children }) => {
  const [time, setTime] = useState(0);
  const [results, setResults] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);

  useEffect(() => {
    if (results) setInGame(false);
  }, [results]);

  useEffect(() => {
    if (playAgain) {
      setTimeout(() => {
        setPlayAgain(false);
        setResults(false);
        setTime(0);
        setInGame(false);
      }, 50);
    }
  }, [playAgain]);

  const value = {
    inGame,
    results,
    time,
    setInGame,
    setResults,
    setTime,
    setPlayAgain,
  };

  return (
    <GameContext.Provider value={value}>
      <PrivateRoute>
        <AnimatePresence>
          {!playAgain && (
            <Wrapper
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.2, delay: 0.1 },
              }}
            >
              <TypingGame />
            </Wrapper>
          )}
        </AnimatePresence>
      </PrivateRoute>
    </GameContext.Provider>
  );
};

export default GameProvider;

const Wrapper = styled(motion.div)``;
