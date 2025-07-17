// app/Services/notificationService.js
import api from './api';

export const getNotificationsByUserId = async (userId) => {
  try {
    const response = await api.get(`/api/notifications/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener notificaciones';
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    await api.put(`/api/notifications/${notificationId}/read`);
  } catch (error) {
    throw error.response?.data?.message || 'Error al marcar como leída';
  }
};

export const deleteNotification = async (notificationId) => {
  try {
    await api.delete(`/api/notifications/${notificationId}`);
  } catch (error) {
    throw error.response?.data?.message || 'Error al eliminar notificación';
  }
};