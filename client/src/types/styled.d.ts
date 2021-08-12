// import original module declarations
import "styled-components";
import { ThemeProps as MyTheme } from "../static/theme";

declare module "styled-components" {
  export interface DefaultTheme extends MyTheme {}
}
