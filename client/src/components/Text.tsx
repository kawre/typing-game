import React from "react";
import styled from "styled-components";
import { space, SpaceProps, typography, TypographyProps } from "styled-system";
import { color, ColorProps } from "../types/styled-system.fix";
// Types -------------------------------------------------------------------------

type Props = SpaceProps & TypographyProps & ColorProps;

// Component ---------------------------------------------------------------------
const Text: React.FC<Props> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Text;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.p<Props>`
  ${color}
  ${space} 
  ${typography}
`;

Wrapper.defaultProps = {
  textColor: "text",
  fontSize: "1rem",
  fontWeight: 400,
};
