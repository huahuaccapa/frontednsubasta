// app/Services/userService.js
import apiClient from '../Axios/axios';

const USER_ENDPOINT = '/api/users';

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get(`${USER_ENDPOINT}/me`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await apiClient.put(`${USER_ENDPOINT}/profile`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const response = await apiClient.put(`${USER_ENDPOINT}/password`, {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await apiClient.delete(`${USER_ENDPOINT}/account`);
    return response.data;
  } catch (error) {
    throw error;
  }
};