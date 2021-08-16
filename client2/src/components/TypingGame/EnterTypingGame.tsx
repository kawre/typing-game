import React, { useState } from "react";
import styled from "styled-components";
import { socket } from "../../pages";
import Button from "../Button";
import { navigate } from "gatsby";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const EnterTypingGame: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button
          size="lg"
          isLoading={loading}
          variant="primary"
          onClick={async () => {
            setLoading(true);
            socket.emit("findRoom", async (id: any) => {
              if (!id) return setLoading(false);
              navigate(`/game/${id}`);
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
  background-color: ${({ theme }) => theme.colors.main30};
  border-radius: ${({ theme }) => theme.rounded.md};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
`;
