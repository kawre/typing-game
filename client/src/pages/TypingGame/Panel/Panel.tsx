import { motion } from "framer-motion";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Text from "../../../components/Text";
import { useTyping } from "../../../contexts/GameContext";
import { useSockets } from "../../../contexts/socket.context";
import { theme } from "../../../static/theme";
import { formatS } from "../../../utils/formatS";
// Types -------------------------------------------------------------------------

interface Props {
  quote: string;
  setWpm: React.Dispatch<React.SetStateAction<number>>;
  wpm: number;
  countdown: number;
}

interface Err {
  startAt: number;
  length: number;
  is: boolean;
}

// Component ---------------------------------------------------------------------
const Panel: React.FC<Props> = ({ quote, setWpm, countdown, wpm }) => {
  // ctx
  const { setProgress, setResults, inGame, time } = useTyping();
  const { socket } = useSockets();

  // ref
  const inputRef = useRef<HTMLInputElement>(null);
  const charRef = useRef<HTMLSpanElement>(null);

  // state
  const [prev, setPrev] = useState({ words: "", chars: "", errors: "" });
  const [next, setNext] = useState({ words: "", chars: "" });
  const [key, setKey] = useState("");
  const [crntWord, setCrntWord] = useState(0);
  const [input, setInput] = useState("");
  const [words] = useState(quote.split(" "));
  const [errors, setErrors] = useState(0);
  const [errAt, setErrAt] = useState(0);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const crntInput = e.target.value;

    if (
      crntWord === words.length - 1 &&
      crntInput.length === words[crntWord].length
    ) {
      if (words[crntWord].slice(-1) === crntInput.slice(-1)) {
        setProgress(100);
        setResults(true);
        return socket.emit("result", { wpm });
      }
    }

    // space handler
    if (key === " " && input === words[crntWord]) {
      setCrntWord((i) => (i += 1));
      setInput("");
      return;
    }

    const len = crntInput.length;
    const word = words[crntWord];
    const correctInput = word.slice(0, len);
    let test = errAt;

    if (crntInput !== correctInput) {
      if (!errAt) {
        setErrAt(len);
        test = len;
      }
      setErrors(() => len - (test - 1));
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

    let nextWords = " " + words.slice(crntWord + 1).join(" ");

    if (len > word.length) {
      const overflow = len - word.length;
      errs += nextWords.slice(0, overflow);
      nextWords = nextWords.slice(overflow);
    }

    setPrev({
      errors: errs,
      chars: word.slice(0, len - errors),
      words: words.slice(0, crntWord).join(" "),
    });

    setNext({
      chars: word.slice(len + 1),
      words: nextWords,
    });
  }, [crntWord, input]);

  // useEffect(() => {
  //   const len = input.length - 1;
  //   const word = words[crntWord];
  //   const prevChars = prev.chars.length;

  //   if (word[len] === input[len]) {
  //   } else if (word[len] !== input[len] && !err?.is) {
  //     setErr({ ...err!, startAt: prevChars, is: true });
  //   } else if (err?.is) {
  //     setErr({ ...err, length: len + 1 - prevChars });
  //   } else {
  //     setErr(null);
  //   }
  // }, [prev]);

  // focus input on game start
  useEffect(() => {
    if (inGame && inputRef?.current) inputRef.current.focus();
  }, [inGame]);

  // progress
  useEffect(() => {
    setProgress((prev.words.length / (quote.length - 1)) * 100);
  }, [prev, next]);

  // calculate wpm
  useEffect(() => {
    if (!inGame) return;
    const minute = (time - 6) / 60;

    // const correct = prev.words.split(" ").join("").length + prev.chars.length;
    const correct = prev.words.length + prev.chars.length;
    const up = correct / 5;
    const wpm = up / minute;

    if (!Number.isInteger(Math.round(wpm))) setWpm(0);
    else setWpm(wpm);
  }, [time, inGame]);

  // useEffect(() => {
  //   const len = input.length;
  //   const word = words[crntWord];
  //   const crntInput = input.slice(0, len);
  //   const correctInput = word.slice(0, len);

  //   if (crntInput !== correctInput) {
  //     if (!errAt) {
  //       setErrAt(prev.chars.length);
  //     }
  //     setErrors(() => len - (errAt - 1));
  //   } else {
  //     setErrAt(0);
  //   }
  // }, [prev]);

  return (
    <Wrapper>
      <Container>
        <Game>
          {prev.words && <Correct>{prev.words} </Correct>}
          {prev.chars && <CharsCorrect>{prev.chars}</CharsCorrect>}
          {errors !== 0 && <Incorrect>{prev.errors}</Incorrect>}
          <Char ref={charRef}>{words[crntWord][input.length]}</Char>
          {next.chars && <CharsComing>{next.chars}</CharsComing>}
          {next.words && <Coming>{next.words}</Coming>}
        </Game>
      </Container>
      <InputWrapper error={errors !== 0}>
        <Input
          ref={inputRef}
          disabled={!inGame}
          onKeyDown={(e) => setKey(e.key)}
          onChange={handleInput}
          value={inGame ? input : 6 - time}
          maxLength={words[crntWord].length + 6}
        />
        {errors === 0 && inGame && <CurrentWord>{words[crntWord]}</CurrentWord>}
      </InputWrapper>
    </Wrapper>
  );
};

export default Panel;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.main}0d;
  border-radius: ${({ theme }) => theme.rounded.md};
`;

const Char = styled.span`
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

const Game = styled.div`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.main};
  font-weight: 500;
  user-select: none;

  & span {
    text-decoration-thickness: 0.125rem;
  }
`;

const Correct = styled.span`
  color: ${({ theme }) => theme.colors.correct};
`;

const CharsCorrect = styled.span`
  color: ${({ theme }) => theme.colors.correct};
  text-decoration: underline;
`;

const CharsComing = styled.span`
  text-decoration: underline;
`;

const Incorrect = styled.span`
  text-decoration: underline;
  background-color: ${({ theme }) => theme.colors.error};
`;

const Coming = styled.span``;

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
