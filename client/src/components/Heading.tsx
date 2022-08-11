import React from "react";
import styled from "styled-components";
import { space, SpaceProps, typography, TypographyProps } from "styled-system";
import { color, ColorProps } from "../types/styled-system.fix";
// Types -------------------------------------------------------------------------

interface Props
  extends SpaceProps,
    TypographyProps,
    ColorProps,
    React.PropsWithChildren {
  as?: any;
}

// Component ---------------------------------------------------------------------
const Heading: React.FC<Props> = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Heading;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.h1<Props>`
  user-select: none;
  ${color}
  ${space}
  ${typography}
`;

Wrapper.defaultProps = {
  textColor: "text",
};
