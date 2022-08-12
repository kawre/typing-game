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
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setPlayAgain: React.Dispatch<React.SetStateAction<boolean>>;
  setStage: React.Dispatch<React.SetStateAction<Stage>>;
  stage: Stage;
  time: number;
}

const GameContext = createContext<Context>(null!);

export const useTyping = () => {
  return useContext(GameContext);
};

interface Props {}
type Stage = "pre" | "game" | "post";

// Component ---------------------------------------------------------------------
const GameProvider: React.FC<Props> = () => {
  const [time, setTime] = useState(0);
  const [stage, setStage] = useState<Stage>("pre");
  const [playAgain, setPlayAgain] = useState(false);

  useEffect(() => {
    if (playAgain) {
      setTimeout(() => {
        setPlayAgain(false);
        setTime(0);
        setStage("pre");
      }, 50);
    }
  }, [playAgain]);

  const value = {
    time,
    stage,
    setTime,
    setPlayAgain,
    setStage,
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
