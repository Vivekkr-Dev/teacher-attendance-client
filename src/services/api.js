import axios from "axios";

const API = axios.create({
  baseURL: "https://teacher-attendance-server.onrender.com/api",
});

export default API;