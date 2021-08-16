import React from "react";
import { io } from "socket.io-client";
import EnterTypingGame from "./components/TypingGame/EnterTypingGame";
import TypingGame from "./components/TypingGame/TypingGame";
import { useTyping } from "./contexts/GameContext";

export const socket = io("http://localhost:5000", { withCredentials: true });

const App: React.FC = () => {
  const { isPlaying } = useTyping();

  return <>{isPlaying ? <TypingGame /> : <EnterTypingGame />}</>;
};

export default App;
