import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTyping } from "../../../contexts/GameContext";
// Types -------------------------------------------------------------------------

interface Props {}

const quote =
  "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.";

// const characters = quote.split(" ").join("").length;

// Component ---------------------------------------------------------------------
const Panel: React.FC<Props> = () => {
  const charRef = useRef<HTMLSpanElement>(null);
  const [prev, setPrev] = useState({ words: "", chars: "", errors: "" });
  const [next, setNext] = useState({ words: "", chars: "" });
  const [key, setKey] = useState("");
  const [crntWord, setCrntWord] = useState(0);
  const [input, setInput] = useState("");
  const [words] = useState(quote.split(" "));
  const [errors, setErrors] = useState(0);
  const { setStats, setProgress, stats } = useTyping();

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

  // progress
  useEffect(() => {
    if (!crntWord) return;
    setProgress((crntWord / words.length) * 100);
  }, [crntWord, prev]);

  // calculate wpm
  useEffect(() => {
    if (!Number.isInteger(stats.time)) return;

    const minute = 60 / stats.time;
    const correct = prev.words.split(" ").join("").length + prev.chars.length;

    setStats({
      ...stats,
      wpm: correct * (minute / 5),
    });
  }, [stats.time]);

  return (
    <Wrapper>
      <Container>
        {/* <Caret charRef={charRef} /> */}
        <Game>
          {prev.words && <Correct>{prev.words} </Correct>}
          {prev.chars && <CharsCorrect>{prev.chars}</CharsCorrect>}
          {errors !== 0 && <Incorrect>{prev.errors}</Incorrect>}
          <Char ref={charRef}>{words[crntWord][input.length]}</Char>
          {next.chars && <CharsComing>{next.chars}</CharsComing>}
          {next.words && <Coming> {next.words}</Coming>}
        </Game>
      </Container>
      <Input
        autoFocus
        onKeyDown={(e) => setKey(e.key)}
        onChange={handleInput}
        value={input}
        maxLength={words[crntWord].length + 6}
      />
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

const Input = styled.input`
  appearance: none;
  border: 0.125rem solid transparent;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.main15};
  border-radius: ${({ theme }) => theme.rounded.sm};
  outline: none;
  margin-top: 1.5rem;
  padding: 0.5rem 0.75rem;

  color: ${({ theme }) => theme.colors.main};
  font-weight: 500;
  font-size: 1.25rem;

  user-select: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.main30};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;
