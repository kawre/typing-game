import React from "react";
import styled from "styled-components";
import Car from "../../../static/images/Car";
import { UserState } from "../TypingGame";
// Types -------------------------------------------------------------------------

interface Props {
  user: UserState;
}

// Component ---------------------------------------------------------------------
const Track: React.FC<Props> = ({ user }) => {
  const { progress, matchId, userId, wpm } = user;

  return (
    <Wrapper>
      <Username>kawre</Username>
      <ProgressBar>
        <Car left={progress + "%"} />
      </ProgressBar>
      <Wpm>
        {/* {place && <Place>{ordinalSuffix(place)} Place</Place>} */}
        <div>
          <span>{wpm}</span>wpm
        </div>
      </Wpm>
    </Wrapper>
  );
};

export default Track;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  border-bottom: 0.1875rem dashed ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  position: relative;

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

const Wpm = styled.div`
  text-align: left;
  flex-shrink: 0;
  margin-left: 24px;
  word-spacing: 0;
  max-height: 60px;
  width: 80px;

  span {
    margin-right: 0.33ch;
    font-weight: 600;
  }
`;

const Place = styled.p`
  font-size: 12px;
  font-weight: 600;
`;

const Username = styled.p`
  text-align: right;
  overflow: hidden;
  overflow-wrap: break-word;
  flex-shrink: 0;
  margin-right: 24px;
  width: 80px;
  max-height: 60px;
`;
