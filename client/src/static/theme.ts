export const theme = {
  rounded: {
    sm: "3px",
    md: "6px",
    lg: "9px",
  },
  font: "'Fira Code', monospace",
  colors: {
    background: "hsl(0, 0%, 93%)",
    main: "hsl(0, 0%, 27%)",
    sub: "hsl(0, 0%, 27%)",
    text: "hsl(0, 0%, 70%)",
    caret: "hsl(0, 0%, 27%)",
    correct: "#66DE93",
    error: "#FF616D",
    errorExtra: "hsl(0, 100%, 42%)",
    main15: "hsla(0, 0%, 70%, 15%)",
    main30: "hsla(0, 0%, 70%, 30%)",
  },
};

export type ThemeProps = typeof theme;
