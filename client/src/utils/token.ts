import instance from "../api/axios";

export class Token {
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
    return localStorage.getItem("token");
  }

  public static set(tkn: string) {
    return localStorage.setItem("token", tkn);
  }
}
