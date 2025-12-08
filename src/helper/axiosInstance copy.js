import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/", // Use the proxy path
  withCredentials: true, // This allows sending cookies or credentials
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "multipart/form-data",
  },
});

// ⬇️ Add interceptor to include Authorization token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

