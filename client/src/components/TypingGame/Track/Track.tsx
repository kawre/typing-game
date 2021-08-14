import React from "react";
import styled from "styled-components";
import Car from "../../../static/images/Car";
import Text from "../../Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Track: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Text mr={4}>kawre</Text>
      <ProgressBar>
        <Car />
      </ProgressBar>
      <Text ml={4}>90 wpm</Text>
    </Wrapper>
  );
};

export default Track;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 0.1875rem dashed ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    flex-grow: 0;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.main};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
`;
