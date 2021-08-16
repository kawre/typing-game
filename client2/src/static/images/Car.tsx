import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { space, SpaceProps, width, WidthProps } from "styled-system";
// Types -------------------------------------------------------------------------

interface Props extends SpaceProps, WidthProps {
  color?: string;
  left?: string;
}

// Component ---------------------------------------------------------------------
const Car: React.FC<Props> = ({ left, ...props }) => {
  return (
    <Wrapper
      animate={{ left }}
      transition={{ ease: "easeOut", duration: 0.15 }}
      {...props}
    >
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 180 90"
      >
        <rect className="cls-1" x="27" y="18" width="9" height="18" />
        <rect className="cls-1" x="72" y="18" width="9" height="18" />
        <rect className="cls-1" y="63" width="9" height="9" />
        <rect className="cls-1" x="171" y="63" width="9" height="9" />
        <rect className="cls-2" x="171" y="45" width="9" height="18" />
        <path
          className="cls-3"
          d="M7824,4510v-36h-36v-9h-9v9h-99v-9h-18v9h-9v27h9v9h-9v9h18v-18h9v-9h18v9h9v18h72v-18h9v-9h18v9h9v18h18v-9Zm-54-54v9h9v-9Zm-9-9v9h9v-9Zm-9-9v9h9v-9Z"
          transform="translate(-7653 -4438)"
        />
        <path
          d="M7698,4492h-18v9h18Zm-18,36h18v-9h-18Zm18-27v18h9v-18Zm-27,0v18h9v-18Z"
          transform="translate(-7653 -4438)"
        />
        <path
          d="M7806,4501v-9h-18v9h18Zm-18,18v9h18v-9h-18Zm18-18v18h9v-18Zm-18,0h-9v18h9v-18Z"
          transform="translate(-7653 -4438)"
        />
        <rect className="cls-1" x="27" y="63" width="18" height="18" />
        <rect className="cls-1" x="135" y="63" width="18" height="18" />
      </svg>
    </Wrapper>
  );
};

export default Car;

// Styled ------------------------------------------------------------------------

const Wrapper = styled(motion.div)<Props>`
  ${width}
  ${space}

  position: absolute;
  display: block;

  .cls-1 {
    fill: #666;
  }
  .cls-2 {
    fill: #fcee21;
  }
  .cls-3 {
    fill: ${(p) => (p.color ? p.color : "#ed1c24")};
  }
`;

Wrapper.defaultProps = {
  width: 60,
};
