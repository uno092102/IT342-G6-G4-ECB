// src/api/apiConfig.js
import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',  // Change to local backend
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || "null");
    if (user?.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
