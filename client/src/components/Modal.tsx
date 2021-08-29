import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { createPortal } from "react-dom";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pos?: DOMRect;
}

// Component ---------------------------------------------------------------------
const Modal: React.FC<Props> = ({ children, open, setOpen, pos }) => {
  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <Wrapper>
          <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
            <Content
              style={{ top: pos?.top, left: pos?.left }}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.2,
                  ease: "backOut",
                },
              }}
            >
              {children}
            </Content>
          </OutsideClickHandler>
        </Wrapper>
      )}
    </AnimatePresence>,
    document.getElementById("portal")!
  );
};

export default Modal;

// Styled ------------------------------------------------------------------------

const Wrapper = styled(motion.div)`
  position: absolute;
  inset: 0;
  /* padding: 5vw; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const Content = styled(motion.div)`
  position: relative;
  /* max-width: 600px; */
`;
