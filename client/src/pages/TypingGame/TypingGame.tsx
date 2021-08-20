import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { useTyping } from "../../contexts/GameContext";
import Panel from "./Panel/Panel";
import Tracks from "./Track/Tracks";
// Types -------------------------------------------------------------------------

interface Props {}

type HashTable = Record<string, number>;

let game: Socket<DefaultEventsMap, DefaultEventsMap>;

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const { id } = useParams<any>();
  const { progress } = useTyping();
  const { user } = useAuth();
  const [time, setTime] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [hash, setHash] = useState<HashTable>({});
  // let hash: HashTable = {};

  useEffect(() => {
    if (!user) return;
    game = io("http://localhost:5000/games", {
      withCredentials: true,
      extraHeaders: { room_id: id, user_id: user._id },
    });

    // join room
    game.emit("joinRoom");

    // on new user
    game.on("newUser", ({ userId }) => {
      setHash(() => {
        hash[userId] = 0;
        return hash;
      });
    });

    // live game data
    game.on("data", ({ userId, progress }) => {
      setHash(() => {
        hash[userId] = progress;
        return hash;
      });
    });

    // game.on("timer", (time) => setTime(time));

    return () => {
      game.disconnect();
    };
  }, [user]);

  useEffect(() => {
    game.emit("progress", progress);
  }, [progress]);

  useEffect(() => {
    console.log("hash:", hash);
  }, [hash]);

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
