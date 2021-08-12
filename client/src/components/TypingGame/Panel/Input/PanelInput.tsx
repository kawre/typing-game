import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setCrntWord: React.Dispatch<React.SetStateAction<number>>;
  crntWord: string;
}

// Component ---------------------------------------------------------------------
const PanelInput: React.FC<Props> = ({
  input,
  crntWord,
  setInput,
  setCrntWord,
}) => {
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = (e.nativeEvent as any).data;

    // space handler
    if (key === " " && input === crntWord) {
      setCrntWord((i) => (i += 1));
      setInput("");
      return;
    }

    setInput(e.currentTarget.value);
  };

  return (
    <Input
      autoFocus
      onChange={inputHandler}
      value={input}
      // onKeyPress={inputHandler}
    />
  );
};

export default PanelInput;

// Styled ------------------------------------------------------------------------

const Input = styled.input`
  appearance: none;
  border: 2px solid transparent;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.main15};
  border-radius: ${({ theme }) => theme.rounded.sm};
  color: ${({ theme }) => theme.colors.main};
  outline: none;
  margin-top: 24px;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 18px;
  user-select: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.main30};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;
