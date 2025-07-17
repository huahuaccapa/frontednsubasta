// app/Services/productService.js
import api from './api';

export const createProduct = async (productData) => {
  try {
    const response = await api.post('/api/products', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al crear producto';
  }
};

export const uploadProductImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('images', file);
    
    const response = await api.post('/api/upload-images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al subir imagen';
  }
};

export const getProducts = async () => {
  try {
    const response = await api.get('/api/products');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error al obtener productos';
  }
};