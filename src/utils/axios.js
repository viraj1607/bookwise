import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api", // change this in production
  baseURL:import.meta.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
