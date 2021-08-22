import { motion } from "framer-motion";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Text from "../../../components/Text";
import { useTyping } from "../../../contexts/GameContext";
import { theme } from "../../../static/theme";
import { formatS } from "../../../utils/formatS";
// Types -------------------------------------------------------------------------

interface Props {
  time: number;
  disabled: boolean;
  quote: string;
  setWpm: React.Dispatch<React.SetStateAction<number>>;
  countdown: number;
}

// Component ---------------------------------------------------------------------
const Panel: React.FC<Props> = ({
  time,
  disabled,
  quote,
  setWpm,
  countdown,
}) => {
  const { setProgress, progress } = useTyping();

  const inputRef = useRef<HTMLInputElement>(null);
  const charRef = useRef<HTMLSpanElement>(null);

  const [prev, setPrev] = useState({ words: "", chars: "", errors: "" });
  const [next, setNext] = useState({ words: "", chars: "" });
  const [key, setKey] = useState("");
  const [crntWord, setCrntWord] = useState(0);
  const [input, setInput] = useState("");
  const [words] = useState(quote.split(" "));
  const [errors, setErrors] = useState(0);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const crntInput = e.target.value;

    // space handler
    if (key === " " && input === words[crntWord]) {
      setCrntWord((i) => (i += 1));
      setInput("");
      return;
    }

    let diff = 0;
    for (let i = 0; i < crntInput.length; i++) {
      const hash: any = {};
      const hash2: any = {};
      hash[i] = crntInput[i];
      hash2[i] = words[crntWord][i];

      if (hash[i] !== hash2[i + diff * 99]) diff += 1;
    }
    setErrors(diff);

    setInput(crntInput);
  };

  // current letter
  useEffect(() => {
    const len = input.length;
    const word = words[crntWord];

    const errs = errors ? word.slice(input.length - errors, input.length) : "";

    setPrev({
      errors: errs,
      chars: word.slice(0, len - errors),
      words: words.slice(0, crntWord).join(" "),
    });

    setNext({
      chars: word.slice(len + 1),
      words: words.slice(crntWord + 1).join(" "),
    });
  }, [crntWord, input]);

  // focus input on game start
  useEffect(() => {
    if (!disabled && inputRef?.current) inputRef.current.focus();
  }, [disabled]);

  // progress
  useEffect(() => {
    if (!crntWord) return;
    setProgress((crntWord / words.length) * 100);
  }, [crntWord, prev]);

  // calculate wpm
  useEffect(() => {
    const minute = time / 60;
    const correct = prev.words.split(" ").join("").length + prev.chars.length;

    setWpm(Math.round(correct / 5 / minute));
  }, [time]);

  return (
    <Wrapper>
      <Stats>
        <Text textColor="main">
          {disabled ? formatS(countdown) : formatS(300 - time)}
        </Text>
      </Stats>
      <Container>
        <Game>
          {prev.words && <Correct>{prev.words} </Correct>}
          {prev.chars && <CharsCorrect>{prev.chars}</CharsCorrect>}
          {errors !== 0 && <Incorrect>{prev.errors}</Incorrect>}
          <Char ref={charRef}>{words[crntWord][input.length]}</Char>
          {next.chars && <CharsComing>{next.chars}</CharsComing>}
          {next.words && <Coming> {next.words}</Coming>}
        </Game>
      </Container>
      <InputWrapper>
        <Input
          ref={inputRef}
          errors={errors}
          disabled={disabled}
          onKeyDown={(e) => setKey(e.key)}
          onChange={handleInput}
          value={input}
          maxLength={words[crntWord].length + 6}
        />
        {errors === 0 && (
          <CurrentWord inGame={!disabled}>
            {disabled ? "Type here when the race begins" : words[crntWord]}
          </CurrentWord>
        )}
      </InputWrapper>
    </Wrapper>
  );
};

export default Panel;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.main15};
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

const Stats = styled.div`
  margin-bottom: 12px;

  p {
    font-weight: 500;
  }
`;

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

const Input = styled.input<{ errors: number }>`
  appearance: none;
  border: 0.125rem solid transparent;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.main15};
  border-radius: ${({ theme }) => theme.rounded.sm};
  outline: none;
  padding: 0 0.75rem;
  color: ${({ theme }) => theme.colors.main};
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 2.5rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.main30};
    background-color: ${({ theme }) => theme.colors.background};
  }

  ${({ errors, theme }) =>
    errors !== 0 &&
    css`
      border-color: ${theme.colors.error} !important;
      color: ${theme.colors.error} !important;
    `};
`;

const InputWrapper = styled.div`
  margin-top: 1.5rem;
  position: relative;
  user-select: none;
`;

const CurrentWord = styled(motion.div)<{ inGame: boolean }>`
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 2.5rem;
  position: absolute;
  border: 2px solid transparent;
  padding-left: 0.75rem;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 0.2;
  color: ${({ theme }) => theme.colors.main};
  pointer-events: none;
  animation: none;
  border-radius: ${({ theme }) => theme.rounded.sm};

  ${({ inGame, theme }) =>
    !inGame &&
    css`
      opacity: 1;
      border-color: transparent;
      animation: flash 600ms ease infinite;

      @keyframes flash {
        0% {
          border-color: ${theme.colors.correct}00;
        }
        50% {
          border-color: ${theme.colors.correct}80;
        }
        100% {
          border-color: ${theme.colors.correct}00;
        }
      }
    `}
`;

const inputAnimation = {
  borderColor: `${theme.colors.correct}00`,
};
