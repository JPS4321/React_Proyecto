import { useState, useEffect } from 'react';
import axios from 'axios';

const useColeccion = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:3000/colecciones');
        setCollections(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener colecciones');
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const addCollection = async ({ nombre, descripcion }) => {
    try {
      const newCollection = { nombre, descripcion };
      const response = await axios.post('http://localhost:3000/colecciones', newCollection);
      setCollections([...collections, response.data]);
      return { success: true, message: 'Colección agregada exitosamente' };
    } catch (err) {
      setError('Error al agregar colección');
      return { success: false, message: 'Error al agregar colección' };
    }
  };

  const deleteCollection = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/colecciones/${id}`);
      setCollections(collections.filter(collection => collection.id !== id));
      return { success: true, message: 'Colección eliminada exitosamente' };
    } catch (err) {
      setError('Error al eliminar colección');
      return { success: false, message: 'Error al eliminar colección' };
    }
  };

  return { collections, loading, error, addCollection, deleteCollection };
};

export default useColeccion;
