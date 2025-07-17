// app/Services/auctionService.js
import api from './api';

export const createAuction = async (auctionData) => {
  try {
    const response = await api.post('/api/auctions', auctionData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al crear subasta';
  }
};

export const getAuctions = async () => {
  try {
    const response = await api.get('/api/auctions');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener subastas';
  }
};

export const getAuctionById = async (id) => {
  try {
    const response = await api.get(`/api/auctions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener subasta';
  }
};