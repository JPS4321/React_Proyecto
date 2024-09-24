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
