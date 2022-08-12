import {
  faArrowsRotate,
  faBackward,
  faForward,
  faPause,
  faPlay,
  faRepeat,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import Icon from "../../components/Icon";
import { formatS } from "../../utils/formatS";
import {
  Char,
  CharsComing,
  CharsCorrect,
  Coming,
  Correct,
  Game as Game2,
  History,
  Incorrect,
  Overflow,
} from "./Panel/Panel";
// Types -------------------------------------------------------------------------

interface Props {
  quote: string;
  history: History[];
  createdAt: number;
}

const options = [
  { value: 0.25, label: "0.25x" },
  { value: 0.5, label: "0.5x" },
  { value: 1, label: "1x" },
  { value: 2, label: "2x" },
  { value: 4, label: "4x" },
  { value: 8, label: "8x" },
];

const customStyle = {
  control: (base: any) => ({
    ...base,
    fontFamily: "Fira Code",
    fontSize: "1rem",
    height: 32,
    minHeight: 32,
  }),
  menu: (base: any) => ({
    ...base,
    fontFamily: "Fira Code",
    fontSize: "1rem",
  }),
};

// Component ---------------------------------------------------------------------
const GameReplay: React.FC<Props> = ({ history, quote, createdAt }) => {
  const [inGame, setInGame] = useState(false);
  const [game, setGame] = useState(history[0].game);
  const [crnt, setCrnt] = useState(0);
  const [stats, setStats] = useState({ wpm: 0, acc: 0, time: 0 });
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!inGame || crnt + 1 > history.length - 1) return;

    const delay = history[crnt + 1].createdAt - history[crnt].createdAt;
    const timeout = setTimeout(() => {
      setGame(history[crnt + 1].game);
      setCrnt((i) => i + 1);
    }, delay / speed);

    return () => {
      clearTimeout(timeout);
    };
  }, [inGame, game, speed]);

  useEffect(() => {
    const { allCorrectInputs, allInputs, correctInputs } = history[crnt];
    const seconds = (history[crnt].createdAt - createdAt) / 1000;
    const wpm = correctInputs / 5 / (seconds / 60);
    const acc = (allCorrectInputs / allInputs) * 100;
    const time = history[crnt].time;
    setStats({ wpm, acc: acc ? acc : 0, time });
  }, [crnt]);

  return (
    <Wrapper>
      <Game>
        {game.prevWords && <Correct>{game.prevWords}</Correct>}
        {game.prevChars && <CharsCorrect>{game.prevChars}</CharsCorrect>}
        {game.errors && <Incorrect>{game.errors}</Incorrect>}
        {game.errorsOverflow && <Overflow>{game.errorsOverflow}</Overflow>}
        {game.char && <Char>{game.char}</Char>}
        {game.nextChars && <CharsComing>{game.nextChars}</CharsComing>}
        {game.nextWords && <Coming>{game.nextWords}</Coming>}
      </Game>
      <ControlsWrapper>
        <Stats>
          <Stat>
            Speed: <strong>{Math.round(stats.wpm)} WPM</strong>
          </Stat>
          |
          <Stat>
            Accuracy: <strong>{stats.acc.toFixed(1)}%</strong>
          </Stat>
          |
          <Stat>
            Time: <strong>{formatS(stats.time)}</strong>
          </Stat>
        </Stats>
        <Buttons>
          <Select
            options={options}
            defaultValue={{ value: 1, label: "1x" }}
            styles={customStyle}
            onChange={(e) => {
              setSpeed(e!.value);
            }}
          />
          <Button
            onClick={() => {
              setInGame(false);
              setGame(history[0].game);
              setCrnt(0);
            }}
          >
            <Icon as={faBackward} size={16} />
          </Button>
          {crnt === history.length - 1 ? (
            <Button
              onClick={() => {
                setInGame(true);
                setGame(history[0].game);
                setCrnt(0);
              }}
            >
              <Icon as={faRotateRight} size={16} />
            </Button>
          ) : (
            <Button onClick={() => setInGame(!inGame)}>
              <Icon as={inGame ? faPause : faPlay} size={16} />
            </Button>
          )}
          <Button
            onClick={() => {
              setInGame(false);
              const len = history.length - 1;
              setGame(history[len].game);
              setCrnt(len);
            }}
          >
            <Icon as={faForward} size={16} />
          </Button>
        </Buttons>
      </ControlsWrapper>
    </Wrapper>
  );
};

export default GameReplay;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.main}0d;
  border-radius: ${({ theme }) => theme.rounded.lg};
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  user-select: none;
`;

const Game = styled(Game2)`
  padding: 1.5rem;
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 1.5rem;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: ${({ theme }) => theme.rounded.md};
  background-color: ${({ theme }) => theme.colors.main}0a;
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
`;

const Stat = styled.p`
  font-size: 1rem;
`;
