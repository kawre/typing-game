// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    font: string;

    colors: {
      background: string;
      main: string;
      sub: string;
      text: string;
      caret: string;
      error: string;
      errorExtra: string;
    };
  }
}
