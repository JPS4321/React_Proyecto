import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = (userId) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No se encontró el token de autenticación');
        }

        const response = await axios.get(`http://localhost:3000/usuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Extrae solo el 'role' del usuario
        const userRole = response.data.role;
        setRole(userRole);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al obtener el role del usuario');
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserRole();
    }
  }, [userId]);

  return { role, loading, error };
};

export default useUser;
