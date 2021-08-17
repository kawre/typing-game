import React from "react";
import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import AuthProvider from "../contexts/AuthContext";
import GlobalStyle from "../global/GlobalStyle";
import { theme } from "../static/theme";
import Header from "./Header/Header";
import Layout from "./Layout";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AppWrapper: React.FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Layout>
            <Header />
            {children}
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AppWrapper;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
