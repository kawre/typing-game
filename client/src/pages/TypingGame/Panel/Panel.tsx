import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useTyping } from "../../../contexts/GameContext";
import { useSockets } from "../../../contexts/socket.context";
import { formatS } from "../../../utils/formatS";
// Types -------------------------------------------------------------------------

interface Props {
  quote: string;
}

export interface History {
  game: typeof initGame;
  createdAt: number;
  correctInputs: number;
  allCorrectInputs: number;
  allInputs: number;
  time: number;
}

const initGame = {
  prevWords: "",
  prevChars: "",
  char: "",
  nextChars: "",
  nextWords: "",
  errors: "",
  errorsOverflow: "",
};

// Component ---------------------------------------------------------------------
const Panel: React.FC<Props> = ({ quote }) => {
  const roomId = (useParams() as any).id;

  // ctx
  const { time, stage, setStage } = useTyping();
  const { socket } = useSockets();

  // ref
  const inputRef = useRef<HTMLInputElement>(null);

  // state
  const [game, setGame] = useState(initGame);
  const [key, setKey] = useState("");
  const [crntWord, setCrntWord] = useState(0);
  const [input, setInput] = useState("");
  const [words] = useState(quote.split(" "));
  const [errors, setErrors] = useState(0);
  const [errAt, setErrAt] = useState(0);
  const [allErrs, setAllErrs] = useState(0);
  const [allInputs, setAllInputs] = useState(0);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState([] as History[]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const crntInput = e.target.value;
    const len = crntInput.length;
    const word = words[crntWord];
    const correctInput = word.slice(0, len);
    let test = errAt;

    // space handler
    if (key === " " && input === word) {
      setCrntWord((i) => i + 1);
      setAllInputs((i) => i + 1);
      setInput("");
      return;
    }

    // track all inputs
    if (key !== "Backspace") {
      if (key !== word[len - 1]) {
        setAllErrs((i) => i + 1);
      }
      setAllInputs((i) => i + 1);
    }

    if (crntInput !== correctInput) {
      if (!errAt || len < errAt) {
        setErrAt(len);
        test = len;
      }

      setErrors(len - (test - 1));
    } else {
      setErrAt(0);
      setErrors(0);
    }

    setInput(crntInput);
  };

  // current letter
  useEffect(() => {
    const len = input.length;
    const word = words[crntWord];
    let errs = errors ? word.slice(len - errors, len) : "";
    let errorsOverflow = "";
    let nextWords = " " + words.slice(crntWord + 1).join(" ");
    let prevWords = words.slice(0, crntWord).join(" ");

    if (crntWord >= 1) {
      prevWords += " ";
    }

    if (len > word.length) {
      const overflow = len - word.length;
      errorsOverflow = nextWords.slice(0, overflow);
      nextWords = nextWords.slice(overflow);
    }

    setGame({
      prevWords,
      prevChars: word.slice(0, len - errors),
      char: word[len] ? word[len] : "",
      nextChars: word.slice(len + 1),
      nextWords,
      errors: errs,
      errorsOverflow,
    });
  }, [input, crntWord, errors]);

  useEffect(() => {
    if (stage !== "game") return;

    const history: History = {
      createdAt: new Date().getTime(),
      game,
      correctInputs: (game.prevWords + game.prevChars).length,
      allCorrectInputs: allInputs - allErrs,
      allInputs,
      time,
    };

    setHistory((prev) => [...prev, history]);
  }, [game, stage, time]);

  // focus input on game start
  useEffect(() => {
    if (stage === "game" && inputRef?.current) inputRef.current.focus();
  }, [stage]);

  useEffect(() => {
    if (stage !== "game") return;
    const correct = (game.prevWords + game.prevChars).length;
    const correctInputs = allInputs - allErrs;
    const progress = (correct / quote.length) * 100;
    setProgress(progress);

    socket.emit("room:user:state", {
      matchId: roomId,
      data: {
        correctInputs: correct,
        allCorrectInputs: correctInputs,
        allInputs,
      },
    });
  }, [game, stage]);

  useEffect(() => {
    if (stage !== "game" || progress !== 100) return;
    setStage("post");
    socket.emit("room:user:finish", { matchId: roomId, history });
  }, [stage, progress]);

  return (
    <Wrapper>
      <Container>
        <Game>
          {game.prevWords && <Correct>{game.prevWords}</Correct>}
          {game.prevChars && <CharsCorrect>{game.prevChars}</CharsCorrect>}
          {game.errors && <Incorrect>{game.errors}</Incorrect>}
          {game.errorsOverflow && <Overflow>{game.errorsOverflow}</Overflow>}
          {game.char && <Char>{game.char}</Char>}
          {game.nextChars && <CharsComing>{game.nextChars}</CharsComing>}
          {game.nextWords && <Coming>{game.nextWords}</Coming>}
        </Game>
      </Container>
      <InputWrapper error={!!errors}>
        {stage === "game" && <Timer>{formatS(180 - time)}</Timer>}
        <Input
          ref={inputRef}
          // disabled={!inGame}
          disabled={stage !== "game"}
          onKeyDown={(e: any) => setKey(e.key)}
          onChange={handleInput}
          value={stage === "game" ? input : time * -1}
          maxLength={words[crntWord].length + 6}
        />
        {errors === 0 && stage === "game" && (
          <CurrentWord>{words[crntWord]}</CurrentWord>
        )}
      </InputWrapper>
    </Wrapper>
  );
};

export default Panel;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 1.5rem;
  /* margin-top: 2rem; */
  background-color: ${({ theme }) => theme.colors.sub};
  border-radius: ${({ theme }) => theme.rounded.md};
`;

export const Char = styled.span`
  text-decoration: underline;
  text-decoration-color: inherit;

  &.correct {
    color: ${({ theme }) => theme.colors.correct};
  }

  &.incorrect {
    background-color: ${({ theme }) => theme.colors.error};
  }
`;

const Container = styled.div``;

export const Game = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  user-select: none;

  & span {
    text-decoration-thickness: 0.125rem;
  }
`;

export const Correct = styled.span`
  color: ${({ theme }) => theme.colors.correct};
`;

export const CharsCorrect = styled.span`
  color: ${({ theme }) => theme.colors.correct};
  text-decoration: underline;
`;

export const CharsComing = styled.span`
  text-decoration: underline;
`;

export const Incorrect = styled.span`
  text-decoration: underline;
  background-color: ${({ theme }) => theme.colors.error};
`;

export const Overflow = styled.span`
  background-color: ${({ theme }) => theme.colors.error};
`;

export const Coming = styled.span``;

const InputWrapper = styled.div<{ error: boolean }>`
  margin-top: 1.5rem;
  position: relative;
  user-select: none;
  overflow: hidden;
  border: 0.125rem solid ${({ theme }) => theme.colors.main}0d;
  border-radius: ${({ theme }) => theme.rounded.sm};
  color: ${({ theme }) => theme.colors.main};

  ${({ theme, error }) =>
    error &&
    css`
      color: ${theme.colors.error};
      border-color: inherit;
    `}
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.main}0d;
  appearance: none;
  width: 100%;
  outline: none;
  color: inherit;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 2.5rem;
  padding-left: 0.75rem;
  z-index: 2;

  &:focus {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const CurrentWord = styled.div`
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 2.5rem;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0.25;
  color: inherit;
  pointer-events: none;
  padding-left: 0.75rem;
  animation: none;
  z-index: 1;
`;

const Timer = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  padding: 0 0.75rem;
  font-weight: 500;
  font-size: 1rem;
  user-select: none;
  pointer-events: none;
`;
