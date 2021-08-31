import React from "react";
import styled from "styled-components";
import Heading from "../../components/Heading";
// Types -------------------------------------------------------------------------

interface Props {
  btns: string[];
}

// Component ---------------------------------------------------------------------
const ConfigSection: React.FC<Props> = ({ btns, children }) => {
  return (
    <Wrapper>
      <h1>font size</h1>
      <Bottom>
        <Text>Change the font size of the test words.</Text>
        <Buttons>
          {btns.map((btn) => {
            let active = true;
            return <Button active={active}>{btn}</Button>;
          })}
        </Buttons>
      </Bottom>
    </Wrapper>
  );
};

export default ConfigSection;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
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
  grid-gap: 0.5rem;
`;

const Button = styled.div<{ active: boolean }>`
  width: 100%;
  height: 100%;
  line-height: 1rem;
  transition: 250ms;
  cursor: pointer;
  text-align: center;
  padding: 0.4rem;
  user-select: none;
  border-radius: ${({ theme }) => theme.rounded.sm};
  background-color: ${({ theme, active }) =>
    !active ? theme.colors.main : theme.colors.main}1a;
`;
