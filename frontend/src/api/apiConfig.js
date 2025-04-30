// src/api/apiConfig.js
import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // In case you also want to send cookies
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || "null");
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
