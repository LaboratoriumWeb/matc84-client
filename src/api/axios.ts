import axios from 'axios';

const baseURL = `${import.meta.env.VITE_REACT_APP_BASE_URL}:${import.meta.env.VITE_REACT_APP_PORT}`;

export default axios.create({
  baseURL
})