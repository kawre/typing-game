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
  const { progress } = useTyping();
  const { user } = useAuth();
  const [time, setTime] = useState("");
  const [disabled, setDisabled] = useState(false);
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
    game.on("newUser", (users: string[]) => {
      setHash((prev) => {
        users.map((id) => {
          prev[id] = 0;
        });
        return prev;
      });
      setRender((i) => (i += 1));
    });

    // live game data
    game.on("data", ({ userId, progress }) => {
      setHash((prev) => {
        prev[userId] = progress;
        return prev;
      });
      setRender((i) => (i += 1));
    });

    return () => {
      game.disconnect();
    };
  }, [user]);

  useEffect(() => {
    game.emit("progress", progress);
  }, [progress]);

  return (
    <Wrapper>
      <Tracks data={hash} />
      <Panel time={time} disabled={disabled} />
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
