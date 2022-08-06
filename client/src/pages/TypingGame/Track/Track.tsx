import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Car from "../../../static/images/Car";
import { ordinalSuffix } from "../../../utils/ordinalSuffix";
import { UserState } from "../TypingGame";
import Icon from "../../../components/Icon";
import { FaCrown } from "react-icons/fa";
// Types -------------------------------------------------------------------------

interface Props {
  u: UserState;
}

// Component ---------------------------------------------------------------------
const Track: React.FC<Props> = ({ u }) => {
  const { progress, matchId, user, wpm, place } = u;

  return (
    <Wrapper>
      <Info>
        <Username>
          {user.username} • <Wpm>{wpm}wpm</Wpm>
        </Username>
        <Place>
          {place ? ordinalSuffix(place) : null}
          {place === 1 && <Icon as={FaCrown} size={18} mb={1} ml={1} />}
        </Place>
      </Info>
      <ProgressBarWrapper>
        <ProgressBar
          initial={{ width: 0 }}
          animate={{ width: `${progress}%`, transition: { ease: "easeInOut" } }}
        />
      </ProgressBarWrapper>
    </Wrapper>
  );
};

export default Track;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  /* background: ${({ theme }) => theme.colors.main}; */
  /* height: 60px; */
  position: relative;

  p {
    flex-grow: 0;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.main};
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.rounded.lg};
  background-color: ${({ theme }) => theme.colors.main}0d;
  width: 100%;
  position: relative;
  padding: 0.6rem;
`;

const ProgressBar = styled(motion.div)`
  border-radius: ${({ theme }) => theme.rounded.md};
  height: 1rem;
  background-color: ${({ theme }) => theme.colors.caret};
`;

const Wpm = styled.span`
  /* text-align: left; */
  font-weight: 600;
  max-height: 60px;

  /* span {
    margin-right: 0.33ch;
    font-weight: 600;
  } */
`;

const Info = styled.div`
  padding: 0.3rem 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const Place = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  user-select: none;
`;

const Username = styled.p`
  /* text-align: right; */
  overflow: hidden;
  overflow-wrap: break-word;
  flex-shrink: 0;
  max-height: 60px;
`;
