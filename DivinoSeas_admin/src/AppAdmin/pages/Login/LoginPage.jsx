import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';
import axios from 'axios'; // Importar axios para hacer las llamadas a la API
import "./LoginPage.css"; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext); // Usamos el AuthContext para manejar la autenticación
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/usuarios/login', {
        email,
        password,
      });

      // Guarda el usuario autenticado en el AuthContext
      login({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
      });

      // Redirigir a la página de inicio o a donde sea necesario
      navigate('/Home');
    } catch (err) {
      setError('Credenciales incorrectas. Intente de nuevo.');
      console.error("Error en el login:", err.response?.data || err.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div>
          <h2>Iniciar Sesión</h2>

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;
