import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import styled from "styled-components";
import Panel from "./Panel/Panel";
import Tracks from "./Track/Tracks";
// Types -------------------------------------------------------------------------

interface Props {}

const game = io("http://localhost:5000/games");

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const { id } = useParams<any>();
  const [room, setRoom] = useState({ users: [] as string[], id: "" });

  useEffect(() => {
    game.emit("joinRoom", { roomId: id, userId: 2 });

    game.on("newUser", (roomData) => {
      setRoom(roomData);
    });

    return () => {
      game.emit("leaveRoom", id);
      // game.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      <Tracks users={room.users} />
      <Panel />
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
