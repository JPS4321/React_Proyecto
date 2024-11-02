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

  const addColors = async ({ nombre }) => {
    try {
      const newColor = { nombre };
      const response = await axios.post('http://localhost:3000/colores', newColor);
      setColors([...colors, response.data]);
      return { success: true, message: 'Color agregado exitosamente' };
    } catch (err) {
      setError('Error al agregar color');
      return { success: false, message: 'Error al agregar color' };
    }
  };

  const deleteColors = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/colores/${id}`);
      setColors(colors.filter(color => color.id !== id));
      return { success: true, message: 'Color eliminado exitosamente' };
    } catch (err) {
      setError('Error al eliminar color');
      return { success: false, message: 'Error al eliminar color' };
    }
  };

  return { colors, loading, error, addColors, deleteColors };
};

export default useColor;
