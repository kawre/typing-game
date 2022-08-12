import { faHome, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import React, { PropsWithChildren, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import Icon from "../../components/Icon";
import { useAuth } from "../../contexts/AuthContext";
import { useTyping } from "../../contexts/GameContext";
import { useSockets } from "../../contexts/socket.context";
import { ordinalSuffix } from "../../utils/ordinalSuffix";
import GameReplay from "./GameReplay";
import { IResults } from "./TypingGame";
// Types -------------------------------------------------------------------------

interface Props {
  res: IResults;
  quote: string;
}

interface ResultsProps extends PropsWithChildren {
  content?: string;
}

const ResultsBlock: React.FC<ResultsProps> = ({ content, children }) => {
  const cntnt = content?.slice(0, 6);
  return (
    <Block>
      {content && (
        <PopUpWrapper
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          whileHover={{ opacity: 1, translateY: -6 }}
        >
          <PopUp>{cntnt}</PopUp>
        </PopUpWrapper>
      )}
      {children}
    </Block>
  );
};

// Component ---------------------------------------------------------------------
const Results: React.FC<Props> = ({ res, quote }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { socket } = useSockets();
  const { setPlayAgain } = useTyping();
  const { user } = useAuth();

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <GameReplay
        history={res.history}
        quote={quote}
        createdAt={res.createdAt}
      />
      <Stats>
        <ResultsBlock content={res.wpm.toString()}>
          {Math.round(res.wpm)}
          <p>wpm</p>
        </ResultsBlock>
        <ResultsBlock content={res.acc.toString()}>
          {`${Math.floor(res.acc)}%`}
          <p>acc</p>
        </ResultsBlock>
        <ResultsBlock>
          {res.finished ? ordinalSuffix(res.place) : "Didn't Finish"}
          <p>place</p>
        </ResultsBlock>
      </Stats>
      <Buttons>
        <Button
          size="lg"
          isLoading={loading}
          variant="primary"
          onClick={async () => {
            setLoading(true);
            socket.emit("room:find", user!.id);
            socket.on("room:found", (roomId) => {
              navigate(`/match/${roomId}`);
              setPlayAgain(true);
            });
          }}
        >
          <Icon as={faRotateRight} />
        </Button>
        <Button size="lg" variant="primary" onClick={() => navigate("/")}>
          <Icon as={faHome} />
        </Button>
      </Buttons>
    </Wrapper>
  );
};

export default Results;

// Styled ------------------------------------------------------------------------

const Wrapper = styled(motion.div)`
  opacity: 0;
`;

const Stats = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 2rem;
`;

const Block = styled.div`
  position: relative;
  height: 8rem;
  width: 100%;
  font-size: 2rem;
  font-weight: 700;
  background-color: ${({ theme }) => theme.colors.main}0d;
  border-radius: ${({ theme }) => theme.rounded.lg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin-top: -0.5rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const PopUpWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: block;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 400;
  user-select: none;
  /* pointer-events: none; */
`;

const PopUp = styled.div`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: ${({ theme }) => theme.rounded.md};
  padding: 0.6rem;

  &::after {
    content: "";
    width: 10px;
    height: 10px;
    transform: rotate(-45deg);
    background-color: ${({ theme }) => theme.colors.main};
    position: absolute;
    z-index: -1;
    bottom: -5px;
    left: calc(50% - 5px);
  }
`;

const Buttons = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.background};
  }
`;
