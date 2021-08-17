import axios, { AxiosError } from "axios";
import { Token } from "../utils/token";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${Token.get()}`,
  },
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Reject promise if usual error
    if (error.response!.status !== 401) {
      return Promise.reject(error);
    }

    return Token.refresh().then((tkn) => {
      const config = error.config;
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
