import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { IPos } from "./Panel";
// Types -------------------------------------------------------------------------

interface ICaret {
  height: number;
}

interface Props {
  position: IPos;
}

// Component ---------------------------------------------------------------------
const Caret: React.FC<Props> = ({ position: { top, left, ...rest } }) => {
  if (left === 0) return null;

  return (
    <Wrapper
      animate={{
        top,
        left,
        transition: { duration: 0.1, ease: "easeOut" },
      }}
      {...rest}
    />
  );
};

export default Caret;

// Styled ------------------------------------------------------------------------

const Wrapper = styled(motion.div)<ICaret>`
  width: 0.1rem;
  position: absolute;
  height: ${(p) => p.height}px;
  border-radius: 1000px;
  background: ${({ theme }) => theme.colors.caret};
`;
