import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import AuthProvider from "../contexts/AuthContext";
import GlobalProvider from "../contexts/GlobalContext";
import GlobalStyle from "../global/GlobalStyle";
import { theme } from "../static/theme";
import { themes } from "../static/themes";
import { Theme } from "../utils/Objects/Theme";
import Header from "./Header/Header";
import Layout from "./Layout";
// Types -------------------------------------------------------------------------

interface Props {}

// Component ---------------------------------------------------------------------
const AppWrapper: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState({
    rounded: {
      sm: "3px",
      md: "5px",
      lg: "7px",
    },
    font: "'Fira Code', monospace",
    colors: themes[Theme.get() || "paper"],
    shadow: {
      sm: "0 0 9px #0000001A",
      md: "",
      lg: "",
    },
  });

  useEffect(() => {
    console.log("porvalo");
  }, [localStorage.getItem("theme")]);

  return (
    <AuthProvider>
      <GlobalProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <Layout>
              <Header />
              {children}
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default AppWrapper;

// Styled ------------------------------------------------------------------------

const Wrapper = styled.div``;
