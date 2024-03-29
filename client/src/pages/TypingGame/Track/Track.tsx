import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";
import { ordinalSuffix } from "../../../utils/ordinalSuffix";
import { UserState } from "../TypingGame";
// Types -------------------------------------------------------------------------

interface Props {
  u: UserState;
}

// Component ---------------------------------------------------------------------
const Track: React.FC<Props> = ({ u }) => {
  const { progress, user, wpm, place } = u;

  return (
    <Wrapper>
      <Info>
        <Username>
          {user.username} • <Wpm>{Math.round(wpm)}wpm</Wpm>
        </Username>
        <Place>
          {place ? ordinalSuffix(place) : null}
          {place === 1 && <Icon as={faCrown} size={18} ml={1} />}
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
  position: relative;

  p {
    flex-grow: 0;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.rounded.lg};
  background-color: ${({ theme }) => theme.colors.sub};
  width: 100%;
  position: relative;
  padding: 0.6rem;
`;

const ProgressBar = styled(motion.div)`
  border-radius: ${({ theme }) => theme.rounded.md};
  height: 1rem;
  background-color: ${({ theme }) => theme.colors.text};
`;

const Wpm = styled.span`
  font-weight: 600;
  max-height: 60px;
`;

const Info = styled.div`
  padding: 0.3rem 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const Place = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  user-select: none;
`;

const Username = styled.p`
  overflow: hidden;
  overflow-wrap: break-word;
  flex-shrink: 0;
  max-height: 60px;
`;
