import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setCrntWord: React.Dispatch<React.SetStateAction<number>>;
  crntWord: string;
  setNext: React.Dispatch<
    React.SetStateAction<{
      words: string;
      chars: string;
    }>
  >;
  setPrev: React.Dispatch<
    React.SetStateAction<{
      words: string;
      chars: string;
    }>
  >;
}

// Component ---------------------------------------------------------------------
const PanelInput: React.FC<Props> = ({
  input,
  crntWord,
  setInput,
  setCrntWord,
  setPrev,
  setNext,
}) => {
  const [key, setKey] = useState("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // space handler
    if (key === " " && input === crntWord) {
      setCrntWord((i) => (i += 1));
      setInput("");
      return;
    }

    setInput(e.target.value);
  };

  return (
    <Input
      autoFocus
      onKeyPress={(e) => setKey(e.key)}
      onChange={handleInput}
      value={input}
      maxLength={crntWord.length + 6}
    />
  );
};

export default PanelInput;

// Styled ------------------------------------------------------------------------

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
