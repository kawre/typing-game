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
  user: User;
  wpm: number;
  matchId: string;
  place?: number;
}

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const roomId = (useParams() as any).id;
  const history = useHistory();

  const { progress, inGame, setInGame, setResults, results, setTime, time } =
    useTyping();

  const [state, setState] = useState([{} as UserState]);
  const [quote, setQuote] = useState("");
  const [wpm, setWpm] = useState(0);
  const [countdown, setCountdown] = useState(6);
  const [res, setRes] = useState<any>(null);
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

    socket.on("error", (err) => {
      if (err === "404" || err === "503") {
        history.push("/");
      }
    });

    socket.on("room:user:results", (results) => {
      console.log("siema");
      console.log(results);
      setResults(true);
      setRes(results);
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
  }, [time, progress]);

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
        <div>
          {res ? (
            <>
              <h1>{res.wpm} wpm</h1>
              <h1>{res.place} place</h1>
            </>
          ) : null}
        </div>
      )}
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
