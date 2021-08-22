import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useTyping } from "../../contexts/GameContext";
import Panel from "./Panel/Panel";
import Tracks from "./Track/Tracks";
// Types -------------------------------------------------------------------------

interface Props {}

export interface Player {
  userId: string;
  progress: number;
}

export interface UserHash {
  progress: number;
  wpm: number;
}

export type HashTable = Record<string, UserHash>;

let game: Socket<DefaultEventsMap, DefaultEventsMap>;

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const history = useHistory();
  const { id } = useParams<any>();

  const { progress } = useTyping();
  const { user } = useAuth();

  const [time, setTime] = useState(0);
  const [inGame, setInGame] = useState(false);
  const [hash, setHash] = useState({} as HashTable);
  const [quote, setQuote] = useState("");
  const [, setRender] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!user) return;
    game = io("http://localhost:5000/games", {
      withCredentials: true,
      extraHeaders: { room: id, user: user._id },
    });

    // join room
    game.emit("joinRoom", (ok: boolean) => {
      console.log(ok);
      if (!ok) history.push("/");
    });

    // on new user
    game.on("newUser", ({ users, quote }) => {
      setHash((prev) => {
        (users as string[]).map((id) => {
          prev[id] = { progress: 0, wpm: 0 };
        });
        return prev;
      });
      setQuote(quote);
      setRender((i) => (i += 1));
    });

    // live game data
    game.on("data", ({ userId, progress, wpm }) => {
      setHash((prev) => {
        prev[userId] = { progress, wpm };
        return prev;
      });
      setRender((i) => (i += 1));
    });

    // countdown
    game.on("countdown", (time) => {
      setCountdown(time);
    });

    game.on("gameStart", () => {
      setInGame(true);
    });

    // current game time
    game.on("timer", (time) => {
      setTime(time);
    });

    return () => {
      game.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!game) return;
    game.emit("progress", { progress, wpm });
  }, [progress, time]);

  return (
    <Wrapper>
      <Tracks quote={quote} data={hash} time={time} />
      {quote && (
        <Panel
          time={time}
          disabled={!inGame}
          quote={quote}
          setWpm={setWpm}
          countdown={countdown}
        />
      )}
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
