// app/Services/authService.js
import api from './api';

export const login = async ({ email, password }) => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al iniciar sesión';
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/api/auth/register', userData);
    localStorage.setItem('authToken', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al registrar usuario';
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/api/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener usuario';
  }
};

export const logout = () => {
  localStorage.removeItem('authToken');
  window.location.href = '/login';
};

export const initiatePasswordReset = async (email) => {
  try {
    await api.post('/api/auth/forgot-password', { email });
  } catch (error) {
    throw error.response?.data?.message || 'Error al enviar correo de recuperación';
  }
};