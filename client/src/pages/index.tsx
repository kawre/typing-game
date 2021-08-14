import React from "react";
import TypingGame from "../components/TypingGame/TypingGame";
import { useTyping } from "../contexts/GameContext";

const IndexPage: React.FC = () => {
  const { stats } = useTyping();

  return (
    <>
      <TypingGame />
    </>
  );
};

export default IndexPage;
