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
  place?: number;
  wpm: number;
}

export type HashTable = Record<string, UserHash>;

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const history = useHistory();

  const {
    progress,
    inGame,
    setInGame,
    setResults,
    results,
    game,
    setTime,
    time,
  } = useTyping();

  const [hash, setHash] = useState({} as HashTable);
  const [quote, setQuote] = useState("");
  const [, setRender] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [countdown, setCountdown] = useState(6);

  useEffect(() => {
    // join room
    game.emit("joinRoom", (ok: boolean) => {
      if (!ok) return history.push("/");
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
    game.on("data", ({ userId, progress, wpm, place }) => {
      setHash((prev) => {
        prev[userId] = { progress, wpm, place: place && place };
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

    game.on("gameEnd", () => {
      setResults(true);
    });

    // current game time
    game.on("timer", (time) => {
      setTime(time);
    });
  }, []);

  useEffect(() => {
    if (!inGame) return;
    game.emit("progress", { progress, wpm: Math.round(wpm) });
  }, [time]);

  return (
    <Wrapper>
      <Tracks quote={quote} data={hash} />
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
