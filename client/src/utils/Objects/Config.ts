import { updateConfig } from "../../api/users";

const fields = ["theme", "fontSize", "fontFamily"] as const;

type Fields = typeof fields[number];

export class Config {
  public static config = localStorage.getItem("config");

  public static async set(id: string, input: any) {
    const cfg = await updateConfig(id, input).then((res) =>
      JSON.stringify(res)
    );
    return localStorage.setItem("config", cfg);
  }

  public static get(field: Fields) {
    return localStorage.getImte(field);
  }
}
