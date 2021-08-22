export const theme = {
  rounded: {
    sm: "3px",
    md: "5px",
    lg: "7px",
  },
  font: "'Fira Code', monospace",
  colors: {
    background: "#EDEDED",
    main: "#454545",
    sub: "#454545",
    text: "#B3B3B3",
    caret: "#454545",
    correct: "#66DE93",
    error: "#FF616D",
    errorExtra: "#D60000",
  },
  shadow: {
    sm: "0 0 9px #0000001A",
    md: "",
    lg: "",
  },
};

export type ThemeProps = typeof theme;
