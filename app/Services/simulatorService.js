// app/services/simulatorService.js
import apiClient from '@/app/Axios/axios';

export async function startAuction(strategyId) {
  const { data } = await apiClient.post('/simulator/iniciar', null, {
    params: { estrategia: strategyId }
  });
  return data;
}

export async function fetchAuctionState() {
  const { data } = await apiClient.get('/simulator/estado');
  return data;
}

export async function sendBid(amount) {
  const { data } = await apiClient.post('/simulator/pujar', null, {
    params: { monto: amount }
  });
  return data;
}
