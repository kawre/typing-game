import React, { useState } from "react";
import styled from "styled-components";
import PanelInput from "./Input/PanelInput";
import { useEffect } from "react";
import { useRef } from "react";
// Types -------------------------------------------------------------------------

interface Props {}

const quote =
  "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.";

// Component ---------------------------------------------------------------------
const Panel: React.FC<Props> = () => {
  const wordsRef = useRef<HTMLDivElement>(null);
  const [crntWord, setCrntWord] = useState(0);
  const [crntChar, setCrntChar] = useState(0);
  const [input, setInput] = useState("");
  const [words] = useState(quote.split(" "));

  // current letter
  useEffect(() => {
    setCrntChar(input.length);

    if (input.length > words[crntWord].length) {
    }
  }, [input]);

  return (
    <Wrapper>
      <Words ref={wordsRef}>
        {words.map((word, wi) => {
          return (
            <Word key={word + wi} className={wi === crntWord ? "active" : ""}>
              {word.split("").map((l, li) => {
                let state = "";

                if (crntWord === wi && li < input.length) {
                  const len = input.length - 2;
                  if (input[li] === l) state = "correct";
                  else if (word[len] !== input[len] && li < input.length)
                    state = "incorrect";
                } else if (crntWord > wi) state = "correct";

                return (
                  <Char className={state} key={l + li}>
                    {l}
                  </Char>
                );
              })}
            </Word>
          );
        })}
      </Words>
      <PanelInput
        setCrntWord={setCrntWord}
        input={input}
        setInput={setInput}
        crntWord={words[crntWord]}
        wordsRef={wordsRef}
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

const Words = styled.div``;

const Word = styled.div`
  padding: 0.125rem 1ch 0.125rem 0;
  display: inline-block;

  &.active span {
    text-decoration: underline;
    text-decoration-color: inherit;
  }

  &:last-child {
    padding-right: 0;
  }
`;

const Char = styled.span`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.main};
  font-weight: 500;
  user-select: none;

  &.correct {
    color: ${({ theme }) => theme.colors.correct};
  }

  &.incorrect {
    background-color: ${({ theme }) => theme.colors.error};
  }
`;
