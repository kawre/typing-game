import React from "react";
import styled from "styled-components";
import GameProvider from "../contexts/GameContext";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <GameProvider>
      <Wrapper>{children}</Wrapper>
    </GameProvider>
  );
};

export default Layout;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 950px;
  margin: auto;
`;
