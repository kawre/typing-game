import React, { useState } from "react";
import styled from "styled-components";
import PanelInput from "./Input/PanelInput";
import { useEffect } from "react";
import { useRef } from "react";
import Caret from "./Caret";
// Types -------------------------------------------------------------------------

export interface IPos {
  left: number;
  top: number;
  height: number;
}

interface Props {}

const quote =
  "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.";

// Component ---------------------------------------------------------------------
const Panel: React.FC<Props> = () => {
  const charRef = useRef<HTMLSpanElement>(null);
  const [prev, setPrev] = useState({ words: "", chars: "" });
  const [next, setNext] = useState({ words: "", chars: "" });
  const [error, setError] = useState(0);

  const [position, setPosition] = useState({} as IPos);
  const [crntWord, setCrntWord] = useState(0);
  const [input, setInput] = useState("");
  const [len, setLen] = useState(0);
  const [words] = useState(quote.split(" "));

  console.log(len);

  // current letter
  useEffect(() => {
    if (!error) {
      setPrev({
        chars: words[crntWord].slice(0, input.length),
        words: words.slice(0, crntWord).join(" ") + " ",
      });

      setNext({
        chars: words[crntWord].slice(input.length + 1),
        words: " " + words.slice(crntWord + 1).join(" "),
      });
    } else {
    }
  }, [crntWord, input, error]);

  // errors length
  useEffect(() => {
    setError(document.querySelectorAll(".incorrect").length);
  }, [document.querySelectorAll(".incorrect")]);

  // length including errors
  useEffect(() => {
    setLen(input.length + error);
  }, [input, error]);

  // caret position
  useEffect(() => {
    if (!charRef.current) return;

    const { top, left, height } = charRef.current.getBoundingClientRect();

    setPosition({ top, left, height });
  }, [charRef.current]);

  return (
    <Wrapper>
      <Container>
        <Caret position={position} />
        <Game>
          <Correct>{prev.words}</Correct>
          <CharsCorrect>{prev.chars}</CharsCorrect>
          {words.map((w, wi) => {
            if (wi !== crntWord) return;

            return w.split("").map((c, ci) => {
              if (ci !== len) return;

              let state = "";

              if (crntWord === wi && ci < input.length) {
                if (input[ci] === c) state = "correct";
                else state = "incorrect";
              }

              // const ca = wordsRef.current?.children[ci];
              // console.log(ca);

              // setPosition({});

              return (
                <Char ref={charRef} className={`${state}`} key={c + ci}>
                  {c}
                </Char>
              );
            });
          })}
          {!error && <CharsComing>{next.chars}</CharsComing>}
          <Coming>{next.words}</Coming>
        </Game>
      </Container>
      <PanelInput
        setCrntWord={setCrntWord}
        input={input}
        setInput={setInput}
        crntWord={words[crntWord]}
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

const Coming = styled.span``;
