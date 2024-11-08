import { useState, useEffect } from 'react';
import axios from 'axios';

const usePromocion = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/promociones');
        setPromotions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener promociones');
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  const addPromotions = async ({ descripcion, descuento, fechaInicio, fechaFin }) => {
    try {
      const newPromotion = { descripcion, descuento, fechaInicio, fechaFin };
      const response = await axios.post('http://localhost:3000/promociones', newPromotion);
      setPromotions([...promotions, response.data]);
      return { success: true, message: 'Promoción agregada exitosamente' };
    } catch (err) {
      setError('Error al agregar promoción');
      return { success: false, message: 'Error al agregar promoción' };
    }
  };

  const deletePromotions = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/promociones/${id}`);
      setPromotions(promotions.filter(promotion => promotion.id !== id));
      return { success: true, message: 'Promoción eliminada exitosamente' };
    } catch (err) {
      setError('Error al eliminar promoción');
      return { success: false, message: 'Error al eliminar promoción' };
    }
  };

  return { promotions, loading, error, addPromotions, deletePromotions };
};

export default usePromocion;
