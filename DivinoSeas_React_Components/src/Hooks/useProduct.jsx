import { useState } from 'react';
import axios from 'axios';

const useProduct = (initialToken = null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(initialToken);

  const fetchToken = async () => {
    if (!token) {
      try {
        const response = await axios.post('http://localhost:3000/auth/generate-token');
        const newToken = response.data.token;
        setToken(newToken);
        return newToken;
      } catch (err) {
        console.error('Error al obtener el token:', err.response?.data || err.message);
        setError('Error al obtener el token');
        return null;
      }
    }
    return token;
  };

  const getAllProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const currentToken = await fetchToken();
      if (!currentToken) {
        setLoading(false);
        return [];
      }

      const response = await axios.get('http://localhost:3000/productos', {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Error al obtener productos');
      console.error('Error al obtener productos:', err);
      setLoading(false);
      return [];
    }
  };

  return {
    getAllProducts,
    loading,
    error,
  };
};

export default useProduct;
