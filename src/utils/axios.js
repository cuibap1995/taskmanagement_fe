import axios from "axios";
import {showLoading,hideLoading}from'./loading';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
instance.interceptors.request.use(
  (config) => {
    // Show loading by default, unless explicitly disabled
    if (config.showLoading !== false) {
      const message = config.loadingMessage || "Loading...";
      showLoading(message);
    }

    // Add auth token if exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    hideLoading();
    return response;
  },
  (error) => {
    hideLoading();

    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized");
          // Redirect to login or refresh token
          break;
        case 403:
          console.error("Forbidden");
          break;
        case 404:
          console.error("Not found");
          break;
        case 500:
          console.error("Server error");
          break;
      }
    }

    return Promise.reject(error);
  }
);
export default instance;
