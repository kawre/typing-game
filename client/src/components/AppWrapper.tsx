import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import AuthProvider from "../contexts/AuthContext";
import GlobalProvider from "../contexts/GlobalContext";
import SocketsProvider from "../contexts/socket.context";
import GlobalStyle from "../global/GlobalStyle";
import { themes } from "../static/themes";
import Header from "./Header/Header";
import Layout from "./Layout";
// Types -------------------------------------------------------------------------

interface Props extends React.PropsWithChildren {}

export const client = new QueryClient();

// Component ---------------------------------------------------------------------
const AppWrapper: React.FC<Props> = ({ children }) => {
  const staticTheme = {
    rounded: {
      sm: "3px",
      md: "5px",
      lg: "7px",
    },
    shadow: {
      sm: "0 0 9px #0000001A",
      md: "",
      lg: "",
    },
  };

  const theme = {
    ...staticTheme,
    font: "Fira Code",
    colors: themes["light"],
    // colors: themes[!Config.get("darkMode") ? "light" : "dark"],
    // font: `"${Config.get("fontFamily")}", "Roboto Mono"`,
  };

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <GlobalProvider>
          <SocketsProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <BrowserRouter>
                <Layout>
                  <Header />
                  {children}
                </Layout>
              </BrowserRouter>
            </ThemeProvider>
          </SocketsProvider>
        </GlobalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
