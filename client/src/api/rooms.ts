import axios from "axios";

const rooms = axios.create({
  baseURL: "http://localhost:5000/api/rooms",
  withCredentials: true,
});

export const findRoom = () => rooms.get("/").then((res) => res.data);
