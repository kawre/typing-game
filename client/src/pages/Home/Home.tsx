import React from "react";
import { io } from "socket.io-client";
import { useTyping } from "../../contexts/GameContext";
import EnterTypingGame from "../TypingGame/EnterTypingGame";
import TypingGame from "../TypingGame/TypingGame";

export const socket = io("http://localhost:5000", { withCredentials: true });

const Home: React.FC = () => {
  const { isPlaying } = useTyping();

  return <>{isPlaying ? <TypingGame /> : <EnterTypingGame />}</>;
};

export default Home;
