import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api", 
  baseURL:`${import.meta.env.VITE_BACKEND_URL}api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
