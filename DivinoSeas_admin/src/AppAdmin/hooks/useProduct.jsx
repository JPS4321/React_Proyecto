import { useState } from 'react';
import axios from 'axios';

const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem('token');

  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });

    try {
      const response = await axios.post('http://localhost:3000/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error al crear el producto:', err);
      setError(err.response?.data?.message || 'Error al crear el producto');
      setLoading(false);
      return null;
    }
  };

  const getAllProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/productos', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setError(err.response?.data?.message || 'Error al obtener productos');
      setLoading(false);
      return [];
    }
  };

  const getProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/productos/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error al obtener producto:', err);
      setError(err.response?.data?.message || 'Error al obtener producto');
      setLoading(false);
      return null;
    }
  };

  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });

    try {
      const response = await axios.put(`http://localhost:3000/productos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error('Error al actualizar el producto:', err);
      setError(err.response?.data?.message || 'Error al actualizar el producto');
      setLoading(false);
      return null;
    }
  };

  return {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    loading,
    error,
  };
};

export default useProduct;
