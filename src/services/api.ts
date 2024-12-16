import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@TodoApp:token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
