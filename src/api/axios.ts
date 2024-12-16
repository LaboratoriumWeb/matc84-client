import axios from "axios";

const baseURL = `${import.meta.env.VITE_REACT_APP_BASE_URL}:${
  import.meta.env.VITE_REACT_APP_PORT
}`;

export default axios.create({
  baseURL,
});

// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:3333",
// });

// Add request interceptor to include auth token
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });
