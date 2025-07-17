// app/services/chatbotService.js
import apiClient from '@/app/Axios/axios';

export async function sendChatMessage(message) {
  const payload = {
    sender: 'Usuario',
    content: message,
  };

  const { data } = await apiClient.post('/chat', payload);
  return data;
}
