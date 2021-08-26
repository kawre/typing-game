export class Theme {
  public static get() {
    return localStorage.getItem("theme");
  }

  public static set(theme: string) {
    return localStorage.setItem("theme", theme);
  }
}
