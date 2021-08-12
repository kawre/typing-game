import React from "react";
import GlobalStyle from "./src/global/GlobalStyle";
import Layout from "./src/components/layout";
import { ThemeProvider } from "styled-components";

export const wrapRootElement = ({ element }) => {
  // const theme = localStorage.getItem("theme");

  const theme = {
    font: `'Fira Code', monospace`,
    colors: {
      background: "hsl(0, 0%, 93%)",
      main: "hsl(0, 0%, 27%)",
      sub: "hsl(0, 0%, 27%)",
      text: "hsl(0, 0%, 70%)",
      caret: "hsl(0, 0%, 27%)",
      error: "hsl(0, 100%, 42%)",
      errorExtra: "hsl(0, 100%, 42%)",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <GlobalStyle />
        {element}
      </Layout>
    </ThemeProvider>
  );
};
