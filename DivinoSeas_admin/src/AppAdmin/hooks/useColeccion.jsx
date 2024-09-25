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

  return { collections, loading, error };
};

export default useColeccion;
