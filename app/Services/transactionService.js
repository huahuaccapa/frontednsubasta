// transactionService.js
import apiClient from '../Axios/axios';

/**
 * Crea una nueva transacción.
 * POST /api/transactions
 * @param {Object} transactionData { amount, auctionId, buyerId, paymentMethodId, status }
 * @returns Promise<TransactionDTO>
 */
export async function createTransaction(transactionData) {
  try {
    const { data } = await apiClient.post('/api/transactions', transactionData);
    return data;  // Devuelve la transacción creada
  } catch (error) {
    console.error('Error al crear la transacción:', error.message);
    throw error;
  }
}

/**
 * Obtiene una transacción por su ID.
 * GET /api/transactions/{id}
 * @param {number} id
 * @returns Promise<TransactionDTO>
 */
export async function getTransactionById(id) {
  try {
    const { data } = await apiClient.get(`/api/transactions/${id}`);
    return data;  // Devuelve la transacción
  } catch (error) {
    console.error(`Error al obtener la transacción con id ${id}:`, error.message);
    throw error;
  }
}

/**
 * Obtiene todas las transacciones.
 * GET /api/transactions
 * @returns Promise<TransactionDTO[]>
 */
export async function getAllTransactions() {
  try {
    const { data } = await apiClient.get('/api/transactions');
    return data;  // Devuelve la lista de transacciones
  } catch (error) {
    console.error('Error al obtener todas las transacciones:', error.message);
    throw error;
  }
}

/**
 * Obtiene las transacciones de una subasta.
 * GET /api/transactions/auction/{auctionId}
 * @param {number} auctionId
 * @returns Promise<TransactionDTO[]>
 */
export async function getTransactionsByAuction(auctionId) {
  try {
    const { data } = await apiClient.get(`/api/transactions/auction/${auctionId}`);
    return data;  // Devuelve las transacciones de la subasta
  } catch (error) {
    console.error(`Error al obtener las transacciones para la subasta con id ${auctionId}:`, error.message);
    throw error;
  }
}

/**
 * Obtiene las transacciones de un comprador.
 * GET /api/transactions/buyer/{buyerId}
 * @param {number} buyerId
 * @returns Promise<TransactionDTO[]>
 */
export async function getTransactionsByBuyer(buyerId) {
  try {
    const { data } = await apiClient.get(`/api/transactions/buyer/${buyerId}`);
    return data;  // Devuelve las transacciones del comprador
  } catch (error) {
    console.error(`Error al obtener las transacciones para el comprador con id ${buyerId}:`, error.message);
    throw error;
  }
}

/**
 * Obtiene las transacciones por su estado.
 * GET /api/transactions/status/{status}
 * @param {string} status
 * @returns Promise<TransactionDTO[]>
 */
export async function getTransactionsByStatus(status) {
  try {
    const { data } = await apiClient.get(`/api/transactions/status/${status}`);
    return data;  // Devuelve las transacciones con el estado solicitado
  } catch (error) {
    console.error(`Error al obtener las transacciones con el estado ${status}:`, error.message);
    throw error;
  }
}

/**
 * Actualiza una transacción.
 * PUT /api/transactions/{id}
 * @param {number} id
 * @param {Object} transactionData
 * @returns Promise<TransactionDTO>
 */
export async function updateTransaction(id, transactionData) {
  try {
    const { data } = await apiClient.put(`/api/transactions/${id}`, transactionData);
    return data;  // Devuelve la transacción actualizada
  } catch (error) {
    console.error(`Error al actualizar la transacción con id ${id}:`, error.message);
    throw error;
  }
}

/**
 * Elimina una transacción (marca como eliminada).
 * DELETE /api/transactions/{id}
 * @param {number} id
 * @returns Promise<void>
 */
export async function deleteTransaction(id) {
  try {
    await apiClient.delete(`/api/transactions/${id}`);
    return `Transacción con id ${id} eliminada`;  // Mensaje de éxito
  } catch (error) {
    console.error(`Error al eliminar la transacción con id ${id}:`, error.message);
    throw error;
  }
}
