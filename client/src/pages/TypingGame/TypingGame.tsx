import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import styled from "styled-components";
import Panel from "./Panel/Panel";
import Tracks from "./Track/Tracks";
// Types -------------------------------------------------------------------------

interface Props {}

const games = io("http://localhost:5000/games");

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const { id } = useParams<any>();
  const [users, setUsers] = useState([] as number[]);

  useEffect(() => {
    games.emit("joinRoom", id);

    games.on("newUser", (userId) => {
      console.log(`user #${userId} joined`);
      setUsers([...users, userId]);
    });

    return () => {
      games.emit("leaveRoom", id);
      // games.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      <Tracks users={users} />
      <Panel />
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
