import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { findRoom } from "../../api/rooms";
import Button from "../../components/Button";
import { useTyping } from "../../contexts/GameContext";
import { useSockets } from "../../contexts/socket.context";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const EnterTypingGame: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { socket } = useSockets();

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button
          size="lg"
          isLoading={loading}
          variant="primary"
          onClick={async () => {
            setLoading(true);
            socket.emit("room:find", "2");
            socket.on("room:found", (xd) => {
              history.push(`/games/${xd}`);
            });
          }}
        >
          Enter a Typing Game
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default EnterTypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background-color: ${({ theme }) => theme.colors.main}1a;
  border-radius: ${({ theme }) => theme.rounded.md};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
`;
