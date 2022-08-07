import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styled from "styled-components";
import Heading from "../../components/Heading";
// Types -------------------------------------------------------------------------

interface Props extends React.PropsWithChildren {
  h: string;
}

// Component ---------------------------------------------------------------------
const ConfigSectionGroup: React.FC<Props> = ({ h, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <Wrapper>
      <HWrapper onClick={() => setOpen(!open)}>
        <Heading>{h}</Heading>
        <Chevron
          initial={{ rotate: 0 }}
          animate={{
            rotate: open ? 0 : -90,
            transition: { ease: "linear", duration: 0.3 },
          }}
        >
          <FaChevronDown />
        </Chevron>
      </HWrapper>
      <Content
        animate={{
          height: open ? undefined : 0,
          transition: { ease: "linear", duration: 0.3 },
        }}
      >
        {children}
      </Content>
    </Wrapper>
  );
};

export default ConfigSectionGroup;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;

const HWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Chevron = styled(motion.div)`
  margin-left: 12px;
  width: 28px;
  height: 28px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Content = styled(motion.div)`
  overflow: hidden;
`;
