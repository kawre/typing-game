import axios from "./axios";

export const findRoom = () => axios.get("/rooms").then((res) => res.data);
