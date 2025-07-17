// app/Axios/axios.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para añadir el token JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de respuestas
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login?sessionExpired=true';
      }
      return Promise.reject(new Error(error.response.data.message || `Error ${error.response.status}`));
    } else if (error.request) {
      return Promise.reject(new Error('Error de conexión con el servidor'));
    } else {
      return Promise.reject(new Error(`Error al configurar la solicitud: ${error.message}`));
    }
  }
);

export default apiClient;