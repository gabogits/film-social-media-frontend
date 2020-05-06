import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: { Accept: "application/json" },
});

export default axiosClient;
