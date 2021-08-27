import React from "react";
import { IconType } from "react-icons";
import styled from "styled-components";
import { size, SizeProps, space, SpaceProps } from "styled-system";
// Types -------------------------------------------------------------------------

interface Props extends SizeProps, SpaceProps {}

// Component ---------------------------------------------------------------------
const Icon: React.FC<Props & { as: IconType }> = ({ as, ...props }) => {
  return <Wrapper {...props}>{React.createElement(as)}</Wrapper>;
};

export default Icon;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div<Props>`
  display: flex;
  cursor: pointer;
  ${size}
  ${space}

  svg {
    width: 100%;
    height: 100%;
  }
`;

Wrapper.defaultProps = {
  size: 26,
  color: "main",
};
