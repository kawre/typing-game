import React from "react";
import styled from "styled-components";
import GameProvider from "../contexts/GameContext";
// Types -------------------------------------------------------------------------

interface Props extends React.PropsWithChildren {}

// Component ---------------------------------------------------------------------
const Layout: React.FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div`
  width: 950px;
  margin: auto;
`;
