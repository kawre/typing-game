import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { DOMAttributes } from "react";
import styled from "styled-components";
import { size, SizeProps, space, SpaceProps } from "styled-system";
import { color, ColorProps } from "../types/styled-system.fix";
// Types -------------------------------------------------------------------------

interface Props
  extends SizeProps,
    SpaceProps,
    ColorProps,
    DOMAttributes<HTMLDivElement> {}

// Component ---------------------------------------------------------------------
const Icon: React.FC<Props & { as: IconDefinition }> = ({ as, ...props }) => {
  const element = <FontAwesomeIcon icon={as} />;
  return <Wrapper {...props}>{element}</Wrapper>;
};

export default Icon;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div<Props>`
  display: flex;
  cursor: pointer;
  ${size}
  ${space}
  ${color}

  svg {
    width: 100%;
    height: 100%;
  }
`;

Wrapper.defaultProps = {
  size: 26,
  color: "inherit",
};
