import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
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
