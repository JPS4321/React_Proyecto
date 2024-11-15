import { useState } from 'react';
import axios from 'axios';

const useOrder = (initialToken = null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(initialToken);

  // Función para obtener un nuevo token desde la ruta `/auth/generate-token`
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

  // Función auxiliar para asegurar que siempre haya un token válido
  const ensureToken = async () => {
    const currentToken = await fetchToken();
    if (!currentToken) {
      throw new Error('No se pudo obtener un token válido');
    }
    return currentToken;
  };

  // Agregar un nuevo cliente
  const addClient = async (clientData) => {
    setLoading(true);
    setError(null);
    try {
      const currentToken = await ensureToken();
      const response = await axios.post('http://localhost:3000/clientes', clientData, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Error al agregar cliente');
      console.error('Error al agregar cliente:', err);
      setLoading(false);
      return null;
    }
  };

  // Crear una nueva orden
  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const currentToken = await ensureToken();
      const response = await axios.post('http://localhost:3000/ordenes', orderData, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Error al crear orden');
      console.error('Error al crear orden:', err);
      setLoading(false);
      return null;
    }
  };

  // Agregar detalles de una orden
  const addOrderDetails = async (orderDetailsData) => {
    setLoading(true);
    setError(null);
    try {
      const currentToken = await ensureToken();
      const response = await axios.post('http://localhost:3000/ordenes-detalles', orderDetailsData, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Error al agregar detalles de orden');
      console.error('Error al agregar detalles de orden:', err);
      setLoading(false);
      return null;
    }
  };

  // Crear un pago
  const createPayment = async (paymentData) => {
    setLoading(true);
    setError(null);
    try {
      const currentToken = await ensureToken();
      const response = await axios.post('http://localhost:3000/pagos', paymentData, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Error al crear pago');
      console.error('Error al crear pago:', err);
      setLoading(false);
      return null;
    }
  };

  // Agregar información de envío
  const addShipping = async (shippingData) => {
    setLoading(true);
    setError(null);
    try {
      const currentToken = await ensureToken();
      const response = await axios.post('http://localhost:3000/envios', shippingData, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Error al agregar envío');
      console.error('Error al agregar envío:', err);
      setLoading(false);
      return null;
    }
  };

  return {
    addClient,
    createOrder,
    addOrderDetails,
    createPayment,
    addShipping,
    loading,
    error,
  };
};

export default useOrder;
