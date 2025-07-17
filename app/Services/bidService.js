// bidService.js
import apiClient from '../Axios/axios';

/**
 * Crea una nueva oferta.
 * POST /api/bids
 * @param {Object} bidData { auctionId, userId, amount }
 * @returns Promise<BidDTO>
 */
export async function createBid(bidData) {
  try {
    const { data } = await apiClient.post('/api/bids', bidData);
    return data;  // Devuelve la oferta creada
  } catch (error) {
    console.error('Error al crear la oferta:', error.message);
    throw error;
  }
}

/**
 * Obtiene una oferta por su ID.
 * GET /api/bids/{id}
 * @param {number} id
 * @returns Promise<BidDTO>
 */
export async function getBidById(id) {
  try {
    const { data } = await apiClient.get(`/api/bids/${id}`);
    return data;  // Devuelve la oferta
  } catch (error) {
    console.error(`Error al obtener la oferta con id ${id}:`, error.message);
    throw error;
  }
}

/**
 * Obtiene todas las ofertas.
 * GET /api/bids
 * @returns Promise<BidDTO[]>
 */
export async function getAllBids() {
  try {
    const { data } = await apiClient.get('/api/bids');
    return data;  // Devuelve la lista de ofertas
  } catch (error) {
    console.error('Error al obtener todas las ofertas:', error.message);
    throw error;
  }
}

/**
 * Obtiene todas las ofertas de una subasta.
 * GET /api/bids/auction/{auctionId}
 * @param {number} auctionId
 * @returns Promise<BidDTO[]>
 */
export async function getBidsByAuction(auctionId) {
  try {
    const { data } = await apiClient.get(`/api/bids/auction/${auctionId}`);
    return data;  // Devuelve las ofertas de la subasta
  } catch (error) {
    console.error(`Error al obtener las ofertas de la subasta con id ${auctionId}:`, error.message);
    throw error;
  }
}

/**
 * Obtiene todas las ofertas de un usuario.
 * GET /api/bids/user/{userId}
 * @param {number} userId
 * @returns Promise<BidDTO[]>
 */
export async function getBidsByUser(userId) {
  try {
    const { data } = await apiClient.get(`/api/bids/user/${userId}`);
    return data;  // Devuelve las ofertas del usuario
  } catch (error) {
    console.error(`Error al obtener las ofertas del usuario con id ${userId}:`, error.message);
    throw error;
  }
}

/**
 * Actualiza una oferta.
 * PUT /api/bids/{id}
 * @param {number} id
 * @param {Object} bidData
 * @returns Promise<BidDTO>
 */
export async function updateBid(id, bidData) {
  try {
    const { data } = await apiClient.put(`/api/bids/${id}`, bidData);
    return data;  // Devuelve la oferta actualizada
  } catch (error) {
    console.error(`Error al actualizar la oferta con id ${id}:`, error.message);
    throw error;
  }
}

/**
 * Elimina una oferta (marca como inactiva o la elimina).
 * DELETE /api/bids/{id}
 * @param {number} id
 * @returns Promise<void>
 */
export async function deleteBid(id) {
  try {
    await apiClient.delete(`/api/bids/${id}`);
    return `Oferta con id ${id} eliminada`;  // Mensaje de éxito
  } catch (error) {
    console.error(`Error al eliminar la oferta con id ${id}:`, error.message);
    throw error;
  }
}
