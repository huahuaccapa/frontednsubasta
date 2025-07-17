// app/Services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Asegúrate que coincida con tu backend

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Importante para OAuth2
});

// Interceptor para JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login?sessionExpired=true';
    }
    return Promise.reject(error);
  }
);

export default api;