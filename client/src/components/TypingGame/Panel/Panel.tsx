import React, { useState } from "react";
import styled from "styled-components";
import PanelInput from "./Input/PanelInput";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Panel: React.FC<Props> = () => {
  const [crntWord, setCrntWord] = useState(0);
  const [crntChar, setCrntChar] = useState(0);
  const [input, setInput] = useState("");
  const [words] = useState(
    "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.".split(
      " "
    )
  );

  // current letter
  useEffect(() => {
    setCrntChar(input.length);
  }, [input]);

  console.log(crntWord);

  return (
    <Wrapper>
      <Words>
        {words.map((word, wi) => {
          let active = wi === crntWord ? "active" : "";
          return (
            <Word key={word + wi} className={active}>
              {word.split("").map((l, li) => {
                let state = "";

                if (crntWord > wi) state = "correct";

                if (crntWord === wi && li < input.length) {
                  if (input[li] === l) state = "correct";
                  else state = "incorrect";
                }

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
      />
    </Wrapper>
  );
};

export default Panel;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.main15};
  border-radius: ${({ theme }) => theme.rounded.md};
`;

const Words = styled.div``;

const Word = styled.div`
  padding: 0.125rem 0.6rem 0.125rem 0;
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
  font-size: 1.25rem;
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
