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

  return { promotions, loading, error };
};

export default usePromocion;
