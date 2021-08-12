import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  as?: any;
  padding?: string;
  margin?: string;
  color?: string;
}

// Component ---------------------------------------------------------------------
const Heading: React.FC<Props> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Heading;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.h1<Props>`
  padding: ${(p) => p.padding};
  margin: ${(p) => p.margin};
  color: ${(p) => (p.color ? p.color : p.theme.colors.main)};
`;
