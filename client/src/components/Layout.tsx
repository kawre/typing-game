import React from "react";
import styled from "styled-components";
// Types -------------------------------------------------------------------------

interface Props {}

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
