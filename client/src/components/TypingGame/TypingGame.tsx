import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import styled from "styled-components";
import Panel from "./Panel/Panel";
import Tracks from "./Track/Tracks";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const [socket, setSocket] =
    useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      <Tracks />
      <Panel />
    </Wrapper>
  );
};

export default TypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
