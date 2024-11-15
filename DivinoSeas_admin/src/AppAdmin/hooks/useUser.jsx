import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        
        // Obtener el token del localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No se encontró el token de autenticación');
        }

        // Hacer la solicitud con el token en el encabezado de autorización
        const response = await axios.get(`http://localhost:3000/usuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al obtener los datos del usuario');
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, loading, error };
};

export default useUser;
