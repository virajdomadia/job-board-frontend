import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

const login = (data) => {
  return api.post("/auth/login", data);
};

const register = (data) => {
  return api.post("/auth/register", data);
};

export default {
  login,
  register,
};
