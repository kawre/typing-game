// interface Themes {
//   [keys: ReturnType<typeof themes>]: {
//   };
// 	theme: Record<>
// }

interface Theme {
  background: string;
  main: string;
  sub: string;
  subAlt?: string;
  text: string;
  textAlt?: string;
  correct: string;
  error: string;
}

type Themes = Record<string, Theme>;

export const themes: Themes = {
  // dark: {
  //   background: "#262a33",
  //   main: "#43ffaf",
  //   caret: "#43ffaf",
  //   sub: "#526777",
  //   text: "#e5f7ef",
  //   correct: "#66DE93",
  //   error: "#ff5f5f",
  //   errorExtra: "#d22a2a",
  // },
  dark: {
    background: "#111",
    main: "#454545",
    sub: "#191919",
    subAlt: "#959595",
    text: "#EDEDED",
    textAlt: "#EDEDED",
    correct: "#66DE93",
    error: "#da3333",
  },
  light: {
    background: "#ededed",
    main: "#454545",
    sub: "#e2e2e2",
    subAlt: "#222222",
    text: "#454545",
    textAlt: "#ededed",
    correct: "#66DE93",
    error: "#FF616D",
  },
};
