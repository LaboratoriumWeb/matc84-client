import axios from 'axios';

const baseURL = `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}`;

export default axios.create({
  baseURL
})