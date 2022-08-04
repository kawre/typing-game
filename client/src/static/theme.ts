import { Theme } from "../utils/Objects/Theme";
import { themes } from "./themes";

export const theme = {
  rounded: {
    sm: "3px",
    md: "5px",
    lg: "7px",
  },
  font: "'Fira Code', monospace",
  colors: themes["dark"],
  shadow: {
    sm: "0 0 9px #0000001A",
    md: "",
    lg: "",
  },
};

export type ThemeProps = typeof theme;
