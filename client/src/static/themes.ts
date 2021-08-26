// interface Themes {
//   [keys: ReturnType<typeof themes>]: {
//   };
// 	theme: Record<>
// }

interface Theme {
  background: string;
  main: string;
  caret: string;
  sub: string;
  text: string;
  correct: string;
  error: string;
  errorExtra: string;
}

type Themes = Record<string, Theme>;

export const themes: Themes = {
  matrix: {
    background: "#2d394d",
    main: "#ff7a90",
    caret: "#ff7a90",
    sub: "#4a768d",
    text: "#fffaf8",
    correct: "#66DE93",
    error: "#ee2a3a",
    errorExtra: "#f04040",
  },
  "modern dolch": {
    background: "#2d2e30",
    main: "#7eddd3",
    caret: "#7eddd3",
    sub: "#54585c",
    text: "#e3e6eb",
    correct: "#66DE93",
    error: "#d36a7b",
    errorExtra: "#994154",
  },
  superuser: {
    background: "#262a33",
    main: "#43ffaf",
    caret: "#43ffaf",
    sub: "#526777",
    text: "#e5f7ef",
    correct: "#66DE93",
    error: "#ff5f5f",
    errorExtra: "#d22a2a",
  },
  mashu: {
    background: "#2b2b2c",
    main: "#76689a",
    caret: "#76689a",
    sub: "#d8a0a6",
    text: "#f1e2e4",
    correct: "#66DE93",
    error: "#d44729",
    errorExtra: "#8f2f19",
  },
  paper: {
    background: "#EDEDED",
    main: "#454545",
    sub: "#454545",
    text: "#B3B3B3",
    caret: "#454545",
    correct: "#66DE93",
    error: "#FF616D",
    errorExtra: "#D60000",
  },
};
