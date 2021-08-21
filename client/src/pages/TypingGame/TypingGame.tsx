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

let game: Socket<DefaultEventsMap, DefaultEventsMap>;

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const history = useHistory();
  const { id } = useParams<any>();
  const { progress, setQuote } = useTyping();
  const { user } = useAuth();
  const [time, setTime] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [hash, setHash] = useState({} as Record<string, number>);
  const [, setRender] = useState(0);

  useEffect(() => {
    if (!user) return;
    game = io("http://localhost:5000/games", {
      withCredentials: true,
      extraHeaders: { room: id, user: user._id },
    });

    // join room
    game.emit("joinRoom", ({ ok }: { ok: boolean }) => {
      if (!ok) history.push("/");
    });

    // on new user
    game.on("newUser", ({ users, quote }) => {
      setHash((prev) => {
        (users as string[]).map((id) => {
          prev[id] = 0;
        });
        return prev;
      });
      setQuote(quote);
      // setRender((i) => (i += 1));
    });

    // live game data
    game.on("data", ({ userId, progress }) => {
      setHash((prev) => {
        prev[userId] = progress;
        return prev;
      });
      setRender((i) => (i += 1));
    });

    // countdown
    game.on("countdown", (time) => {
      setTime(time);
    });

    game.on("gameStart", () => setDisabled(false));

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
    game.emit("progress", progress);
  }, [progress, game]);

  return (
    <Wrapper>
      <Tracks data={hash} time={time} />
      <Panel time={time} disabled={disabled} />
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
