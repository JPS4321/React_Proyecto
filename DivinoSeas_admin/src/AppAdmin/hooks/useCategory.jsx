import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categorias');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener categorías');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategory;
