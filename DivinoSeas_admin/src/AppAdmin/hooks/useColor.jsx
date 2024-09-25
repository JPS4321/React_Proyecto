import { useState, useEffect } from 'react';
import axios from 'axios';

const useColor = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/colores');
        setColors(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener colores');
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  return { colors, loading, error };
};

export default useColor;
