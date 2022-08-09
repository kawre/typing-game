import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeProvider } from "styled-components";
import { getConfig } from "../api/users";
import { themes } from "../static/themes";
import { useAuth } from "./AuthContext";
// Types -------------------------------------------------------------------------

interface Context {
  config: any;
}

interface Props extends PropsWithChildren {}

const ConfigContext = createContext<Context>(null!);

export const useConfig = () => {
  return useContext(ConfigContext);
};

// Component ---------------------------------------------------------------------
const ConfigProvider: React.FC<Props> = ({ children }) => {
  let config;

  const value = { config };
  return (
    // <ThemeProvider theme={theme}>
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
    // </ThemeProvider>
  );
};

export default ConfigProvider;
