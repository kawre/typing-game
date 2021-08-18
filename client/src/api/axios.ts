import axios, { AxiosError } from "axios";
import { Token } from "../utils/Token";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

instance.interceptors.request.use(
  (cfg) => {
    cfg.headers.Authorization = Token.getWithBearer();
    return cfg;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => response,
  (err: AxiosError<Error>) => {
    // Reject promise if usual error
    if (err.response!.status !== 401) {
      return Promise.reject(err);
    }

    if (err.config.url == "/auth/token/refresh") {
      Token.clear();
      return new Promise((_, reject) => reject(err));
    }

    return Token.refresh().then((tkn) => {
      const config = err.config;
      config.headers["Authorization"] = `Bearer ${tkn}`;

      return new Promise((resolve, reject) => {
        axios
          .request(config)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }
);

export default instance;
