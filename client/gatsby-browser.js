import React from "react";
import GlobalStyle from "./src/global/GlobalStyle";
import Layout from "./src/components/Layout";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/static/theme";

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <GlobalStyle />
        {element}
      </Layout>
    </ThemeProvider>
  );
};
