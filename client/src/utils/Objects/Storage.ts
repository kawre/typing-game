export class Storage {
  public static set(key: string, value: any) {
    let payload = value;

    if (typeof payload === "object") payload = JSON.stringify(value);

    return localStorage.setItem(key, payload);
  }
}
