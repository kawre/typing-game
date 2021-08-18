import React from "react";
import { useTyping } from "../../contexts/GameContext";
import EnterTypingGame from "../TypingGame/EnterTypingGame";
import TypingGame from "../TypingGame/TypingGame";

const Home: React.FC = () => {
  const { isPlaying } = useTyping();

  return <>{isPlaying ? <TypingGame /> : <EnterTypingGame />}</>;
};

export default Home;
