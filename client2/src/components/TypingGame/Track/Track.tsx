import React from "react";
import styled from "styled-components";
import { useTyping } from "../../../contexts/GameContext";
import Car from "../../../static/images/Car";
import Text from "../../Text";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Track: React.FC<Props> = () => {
  const { progress, stats } = useTyping();

  return (
    <Wrapper>
      <Text mr={4}>kawre</Text>
      <ProgressBar>
        <Car left={`${progress}%`} />
      </ProgressBar>
      <Text ml={4}>{Math.round(stats.wpm)} wpm</Text>
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
  margin-right: 60px;
  top: 0;
  height: 30px;
  position: relative;
`;
