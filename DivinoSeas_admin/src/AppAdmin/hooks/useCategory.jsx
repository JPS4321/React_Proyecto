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

  const addCategory = async ({ nombre, descripcion }) => {
    try {
      const newCategory = { nombre, descripcion };
      const response = await axios.post('http://localhost:3000/categorias', newCategory);
      setCategories([...categories, response.data]);
      return { success: true, message: 'Categoría agregada exitosamente' };
    } catch (err) {
      setError('Error al agregar categoría');
      return { success: false, message: 'Error al agregar categoría' };
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3000/categorias/${categoryId}`);
      setCategories(categories.filter(category => category.name !== categoryId));
    } catch (err) {
      setError('Error al eliminar categoría');
    }
  };

  return { categories, loading, error, addCategory, deleteCategory };
};

export default useCategory;
