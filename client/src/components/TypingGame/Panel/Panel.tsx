import React from "react";
import styled from "styled-components";
import PanelInput from "./PanelInput";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Panel: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Text>
        Books are the quietest and most constant of friends; they are the most
        accessible and wisest of counselors, and the most patient of teachers.
      </Text>
      <PanelInput />
    </Wrapper>
  );
};

export default Panel;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.main15};
  border-radius: ${({ theme }) => theme.rounded.md};
`;

const Text = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.main};
  font-weight: 500;
  user-select: none;
  line-height: 32px;
`;
