const fields = ["theme", "fontSize", "fontFamily"] as const;

type Fields = typeof fields[number];

export class Config {
  public static set(field: Fields, input: any) {
    return localStorage.setItem(field, input);
  }

  public static get(field: Fields) {
    return localStorage.getImte(field);
  }
}
