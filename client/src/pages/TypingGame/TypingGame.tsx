import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useTyping } from "../../contexts/GameContext";
import { useSockets } from "../../contexts/socket.context";
import { User } from "../../types/auth.types";
import Panel from "./Panel/Panel";
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

export interface IResults {
  wpm: number;
  place: number;
}

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const roomId = (useParams() as any).id;
  const navigate = useNavigate();

  const { inGame, setInGame, setResults, setTime, time } = useTyping();

  const [state, setState] = useState([{} as UserState]);
  const [quote, setQuote] = useState("");
  const [wpm, setWpm] = useState(0);
  const [progress, setProgress] = useState(0);
  const [res, setRes] = useState<IResults | null>(null);
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
      setInGame(true);
    });

    socket.on("room:end", () => {
      setResults(true);
    });

    // current game time
    socket.on("room:time", (time) => {
      setTime(time);
    });

    // handle errors
    socket.on("error", (err) => {
      if (err === "404" || err === "503") {
        navigate("/");
      }
    });

    // results
    socket.on("room:user:results", (results) => {
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
      data: { progress, wpm },
    });
  }, [time, progress]);

  return (
    <Wrapper>
      <Tracks data={state} />
      {!res ? (
        quote && (
          <Panel
            quote={quote}
            wpm={wpm}
            setWpm={setWpm}
            setProgress={setProgress}
          />
        )
      ) : (
        <Results res={res} quote={quote} />
      )}
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
