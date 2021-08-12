import React from "react";
import GlobalStyle from "./src/global/GlobalStyle";
import Layout from "./src/components/Layout";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/static/theme";
import Header from "./src/components/Header/Header";

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Header />
        {element}
      </Layout>
    </ThemeProvider>
  );
};
