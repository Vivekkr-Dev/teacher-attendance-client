import axios from "axios";

const API = axios.create({
  baseURL: "https://teacher-attendance-server.onrender.com",
});

export default API;