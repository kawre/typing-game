import React from "react";
import styled from "styled-components";
import Button from "../Button";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const EnterTypingGame: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Button size="lg" variant="primary">
        Enter a Typing Game
      </Button>
    </Wrapper>
  );
};

export default EnterTypingGame;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 100%;
  height: 350px;
  background-color: ${({ theme }) => theme.colors.main30};
  border-radius: ${({ theme }) => theme.rounded.md};
`;
