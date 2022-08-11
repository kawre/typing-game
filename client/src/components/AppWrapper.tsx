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
import ConfigProvider from "../contexts/config.context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    colors: themes[localStorage.getItem("theme") || "light"],
  };

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <GlobalProvider>
          <ConfigProvider>
            <SocketsProvider>
              <ThemeProvider theme={theme}>
                <StyledContainer
                  position="top-left"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                <GlobalStyle />
                <BrowserRouter>
                  <Layout>
                    <Header />
                    {children}
                  </Layout>
                </BrowserRouter>
              </ThemeProvider>
            </SocketsProvider>
          </ConfigProvider>
        </GlobalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;

// Styled ------------------------------------------------------------------------

const StyledContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    border-radius: ${({ theme }) => theme.rounded.lg};
    background-color: ${({ theme }) => theme.colors.main};
    color: ${({ theme }) => theme.colors.textAlt};
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
  }
`;
