import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import styled from "styled-components";
import { getCommentRange } from "typescript";
import { useAuth } from "../../contexts/AuthContext";
import { useTyping } from "../../contexts/GameContext";
import Panel from "./Panel/Panel";
import Tracks, { IUser } from "./Track/Tracks";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const TypingGame: React.FC<Props> = () => {
  const { id } = useParams<any>();
  const { progress } = useTyping();
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const game = io("http://localhost:5000/games", { withCredentials: true });

    game.emit("joinRoom", { roomId: id, userId: user?._id });
    game.on("newUser", (users) => {
      console.log(users);
      setUsers(users);
    });

    game.on("timer", (time) => {
      console.log(time);
    });

    game.on("collect", (data) => {
      game.emit("data", [id, { progress, userId: user?._id }]);

      setUsers(data);
    });

    return () => {
      game.disconnect();
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
