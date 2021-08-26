import instance from "../../api/axios";

export class Token {
  private static readonly TOKEN_NAME = "token";

  public static refresh() {
    return new Promise((resolve, reject) => {
      instance
        .get("/auth/token/refresh")
        .then(({ data }) => {
          this.set(data.accessToken);
          resolve(data.accessToken);
        })
        .catch((err) => reject(err));
    });
  }

  public static get() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  public static getWithBearer() {
    return `Bearer ${this.get()}`;
  }

  public static set(tkn: string) {
    return localStorage.setItem(this.TOKEN_NAME, tkn);
  }

  public static clear() {
    return localStorage.removeItem(this.TOKEN_NAME);
  }
}
