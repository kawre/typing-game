import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  color?: string;
  padding?: string;
  margin?: string;
}

// Component ---------------------------------------------------------------------
const Text: React.FC<Props> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Text;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.p<Props>`
  color: ${(p) => (p.color ? p.color : p.theme.colors.text)};
  font-size: 1rem;
  font-weight: 400;
`;
