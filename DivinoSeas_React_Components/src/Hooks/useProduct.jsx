import { useState } from 'react';
import axios from 'axios';

const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todos los productos
  const getAllProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/productos');
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Error al obtener productos');
      console.error('Error al obtener productos:', err);
      setLoading(false);
      return [];
    }
  };
  
  // Obtener producto por ID
  const getProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/productos/${id}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Error al obtener producto');
      setLoading(false);
      return null;
    }
  };

  return {
    getAllProducts,
    getProductById,
    loading,
    error,
  };
};

export default useProduct;
