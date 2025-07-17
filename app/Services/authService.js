// app/Services/authService.js
import apiClient from '../Axios/axios';

const AUTH_ENDPOINT = '/api/auth';

export const register = async (userData) => {
  try {
    const response = await apiClient.post(`${AUTH_ENDPOINT}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post(`${AUTH_ENDPOINT}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get(`${AUTH_ENDPOINT}/me`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const initiatePasswordReset = async (email) => {
  try {
    const response = await apiClient.post(`${AUTH_ENDPOINT}/password-reset/initiate`, null, {
      params: { email }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const completePasswordReset = async (token, newPassword) => {
  try {
    const response = await apiClient.post(`${AUTH_ENDPOINT}/password-reset/complete`, null, {
      params: { token, newPassword }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};