import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "../global/GlobalStyle";
import { theme } from "../static/theme";
import Header from "./Header/Header";
import Layout from "./Layout";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AppWrapper: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Header />
        {children}
      </Layout>
    </ThemeProvider>
  );
};

export default AppWrapper;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
