import { useState, useEffect } from 'react';
import axios from 'axios';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener todas las órdenes
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/ordenes');
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener las órdenes');
      setLoading(false);
    }
  };

  // Función para crear una nueva orden
  const createOrder = async (estado, id_cliente) => {
    try {
      const response = await axios.post('http://localhost:3000/ordenes', {
        estado,
        id_cliente,
      });
      setOrders((prevOrders) => [...prevOrders, response.data]);
    } catch (err) {
      setError('Error al crear la orden');
    }
  };

  // Función para actualizar una orden existente
  const updateOrder = async (id, estado) => {
    try {
      await axios.put(`http://localhost:3000/ordenes/${id}`, { estado });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id_orden === id ? { ...order, estado } : order
        )
      );
    } catch (err) {
      setError('Error al actualizar la orden');
    }
  };

  // Función para eliminar una orden
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/ordenes/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id_orden !== id));
    } catch (err) {
      setError('Error al eliminar la orden');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, createOrder, updateOrder, deleteOrder };
};

export default useOrders;
