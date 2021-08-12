import React from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const PanelInput: React.FC<Props> = () => {
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {};

  return <Input onChange={inputHandler} />;
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
