import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

export interface IPos {
  left: number;
  top: number;
  height: number;
}

interface Props {
  charRef: React.RefObject<HTMLSpanElement>;
}

// Component ---------------------------------------------------------------------
const Caret: React.FC<Props> = ({ charRef }) => {
  const [{ left, top, height }, setPosition] = useState({} as IPos);

  // caret position
  useEffect(() => {
    if (!charRef.current) return;
    const { top, left, height } = charRef.current.getBoundingClientRect();
    setPosition({ top, left, height });
  }, [charRef.current]);

  return (
    <Wrapper
      animate={{
        top,
        left,
      }}
      height={height}
    />
  );
};

export default Caret;

// Styled ------------------------------------------------------------------------

const Wrapper = styled(motion.div)<{ height: number }>`
  width: 0.1rem;
  position: absolute;
  height: ${(p) => p.height}px;
  border-radius: 1000px;
  background: ${({ theme }) => theme.colors.caret};
`;
