import React from "react";
import { useTyping } from "../../contexts/GameContext";
import { useGlobal } from "../../contexts/GlobalContext";
import EnterTypingGame from "../TypingGame/EnterTypingGame";
import TypingGame from "../TypingGame/TypingGame";

const Home: React.FC = () => {
  const { isPlaying } = useGlobal();

  return <>{isPlaying ? <TypingGame /> : <EnterTypingGame />}</>;
};

export default Home;
