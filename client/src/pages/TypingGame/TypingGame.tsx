import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useTyping } from "../../contexts/GameContext";
import { useSockets } from "../../contexts/socket.context";
import { User } from "../../types/auth.types";
import Panel from "./Panel/Panel";
import Tracks from "./Track/Tracks";
// Types -------------------------------------------------------------------------

interface Props {}

export interface Player {
  userId: string;
  progress: number;
}

export interface UserState {
  progress: number;
  userId: number;
  wpm: number;
  matchId: string;
}

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const roomId = (useParams() as any).id;

  const { progress, inGame, setInGame, setResults, results, setTime, time } =
    useTyping();

  const { user: elo } = useAuth();
  const user = elo as User;

  const [state, setState] = useState([{} as UserState]);
  const [quote, setQuote] = useState("");
  const [wpm, setWpm] = useState(0);
  const [countdown, setCountdown] = useState(6);
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

    // countdown
    socket.on("countdown", (time) => {
      setCountdown(time);
    });

    socket.on("room:start", () => {
      setInGame(true);
    });

    socket.on("room:end", () => {
      setResults(true);
    });

    // current game time
    socket.on("room:time", (time) => {
      setTime(time);
    });

    return () => {
      socket.emit("room:leave", roomId);
    };
  }, []);

  useEffect(() => {
    if (!inGame) return;
    socket.emit("room:user:state", {
      matchId: roomId,
      data: {
        progress,
        wpm: Math.round(wpm),
      },
    });
  }, [time]);

  useEffect(() => {
    if (progress === 100) {
      socket.emit("room:finish", {
        roomId,
        data: { progress, wpm: wpm.toFixed(2) },
      });
    }
  }, [progress]);

  return (
    <Wrapper>
      <Tracks cntdwn={countdown} data={state} />
      {!results ? (
        quote && (
          <Panel
            quote={quote}
            wpm={wpm}
            setWpm={setWpm}
            countdown={countdown}
          />
        )
      ) : (
        <h1>res</h1>
      )}
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
