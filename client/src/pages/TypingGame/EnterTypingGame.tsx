import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { findRoom } from "../../api/rooms";
import Button from "../../components/Button";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const EnterTypingGame: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button
          size="lg"
          isLoading={loading}
          variant="primary"
          onClick={async () => {
            setLoading(true);
            const { id } = await findRoom();
            if (!id) return setLoading(false);
            history.push(`/games/${id}`);
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
