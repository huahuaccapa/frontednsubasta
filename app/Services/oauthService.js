// app/Services/oauthService.js
import apiClient from '../Axios/axios';

export const handleOAuthRedirect = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/oauth2/authorize/google`;
};

export const oauthSuccess = async () => {
  try {
    const response = await apiClient.get('/oauth2/success');
    return response.data;
  } catch (error) {
    throw error;
  }
};