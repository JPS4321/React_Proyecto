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
  
      console.log("Respuesta del servidor:", response.data); // Imprime la respuesta completa
  
      const { token, user } = response.data; // Extrae token y user
      if (token && user) {
        localStorage.setItem("token", token); // Guarda el token
        localStorage.setItem("user", JSON.stringify(user)); // Guarda el usuario
        console.log("Usuario guardado en localStorage:", user); // Confirma los datos almacenados
      } else {
        throw new Error("La respuesta del servidor no contiene un token o usuario válido.");
      }
  
      setLoading(false);
      return response.data;
    } catch (err) {
      console.error("Error durante el login:", err);
      setError('Credenciales incorrectas. Intente de nuevo.');
      setLoading(false);
      return null;
    }
  };
  

  return { loginUser, loading, error };
};

export default useLogin;
