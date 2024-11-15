import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/usuarios/login', {
        email,
        password,
      });

      // Almacenar el token en localStorage
      const token = response.data?.token;
      if (token) {
        localStorage.setItem("token", token); // Guarda el token
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Guarda la información del usuario
      } else {
        console.error("No se recibió un token del servidor.");
      }

      setLoading(false);
      return response.data;
    } catch (err) {
      setError('Credenciales incorrectas. Intente de nuevo.');
      setLoading(false);
      return null;
    }
  };

  return { loginUser, loading, error };
};

export default useLogin;
