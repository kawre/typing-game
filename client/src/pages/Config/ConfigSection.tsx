import React from "react";
import styled, { css } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
// Types -------------------------------------------------------------------------

interface Props {
  btns: string[];
  name: string;
  text?: string;
}

// Component ---------------------------------------------------------------------
const ConfigSection: React.FC<Props> = ({ btns, text, name }) => {
  const { user } = useAuth();

  return (
    <Wrapper>
      <h1>{name}</h1>
      <Bottom>
        {text && <Text>{text}</Text>}
        <Buttons>
          {btns.map((btn, i) => {
            let active = true;
            return (
              <Button
                key={i}
                active={!active}
                // onClick={() =>
                // Config.set({ [toCamelCase(name)]: btn }, user?._id)
                // }
              >
                {btn}
              </Button>
            );
          })}
        </Buttons>
      </Bottom>
    </Wrapper>
  );
};

export default ConfigSection;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  margin-bottom: 24px;

  h1 {
    font-size: 1rem;
    font-weight: 500;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  width: 200%;
  color: ${({ theme }) => theme.colors.text};
`;

const Buttons = styled.div`
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 0.5rem;
`;

const Button = styled.div<{ active: boolean }>`
  line-height: 1rem;
  transition: 250ms;
  cursor: pointer;
  text-align: center;
  padding: 0.4rem;
  user-select: none;
  border-radius: 0.25rem;
  align-content: center;
  height: min-content;

  ${({ active, theme }) =>
    active
      ? css`
          color: ${theme.colors.background};
          background-color: ${theme.colors.main};
        `
      : css`
          color: ${theme.colors.main};
          background-color: ${theme.colors.main}1a;
        `}

  &:hover {
    color: ${({ theme }) => theme.colors.background};
    background-color: ${({ theme }) => theme.colors.main};
  }
`;
