import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useTyping } from "../../contexts/GameContext";
import { useSockets } from "../../contexts/socket.context";
import { User } from "../../types/auth.types";
import Panel, { History } from "./Panel/Panel";
import Results from "./Results";
import Tracks from "./Track/Tracks";
// Types -------------------------------------------------------------------------

interface Props {}

export interface Player {
  userId: string;
  progress: number;
}

export interface UserState {
  progress: number;
  user: User;
  wpm: number;
  matchId: string;
  place?: number;
}

export type GameState = UserState[];

export interface IResults {
  wpm: number;
  place: number;
  acc: number;
  finished: boolean;
  history: History[];
  createdAt: number;
}

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const roomId = (useParams() as any).id;

  // ctx
  const { setTime, setStage, stage } = useTyping();

  // state
  const [state, setState] = useState([] as GameState);
  const [quote, setQuote] = useState("");
  const [results, setResults] = useState<IResults | null>(null);
  const { socket } = useSockets();

  useEffect(() => {
    // join room
    socket.emit("room:join", roomId);

    // init room state
    socket.on("room:state", (data) => {
      setState(data);
    });

    socket.on("room:quote", (text: string) => {
      setQuote(text);
    });

    socket.on("room:start", () => {
      setStage("game");
    });

    // current game time
    socket.on("room:time", (time) => {
      setTime(time);
    });

    // results
    socket.on("room:user:results", (res) => {
      setResults(res);
    });

    return () => {
      socket.emit("room:leave", roomId);
      socket.off("room:state");
      socket.off("room:quote");
      socket.off("room:start");
      socket.off("room:time");
      socket.off("room:user:results");
    };
  }, []);

  return (
    <Wrapper>
      <Tracks data={state} />
      {stage === "post"
        ? results && <Results res={results} quote={quote} />
        : quote && <Panel quote={quote} />}
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
