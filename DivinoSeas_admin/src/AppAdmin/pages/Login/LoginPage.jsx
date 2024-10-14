import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';
import axios from 'axios';
import "./LoginPage.css"; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Campo adicional para el registro
  const [isRegister, setIsRegister] = useState(false); // Estado para alternar entre registro e inicio de sesión
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/usuarios/login', {
        email,
        password,
      });

      login({
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
      });

      navigate('/Home');
    } catch (err) {
      setError('Credenciales incorrectas. Intente de nuevo.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/usuarios', {
        username,
        email,
        password_hashed: password, // Asumiendo que tu backend hashea la contraseña
        is_admin: false, // Definir si el usuario es administrador o no
        role: 'user' // Asignar un rol por defecto
      });

      // Simular el inicio de sesión después del registro exitoso
      login({
        id: response.data.userId,
        username,
        email,
        role: 'user',
      });

      navigate('/Home');
    } catch (err) {
      setError('Error al registrar el usuario. Intente de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={isRegister ? handleRegister : handleLogin}>
        <div>
          <h2>{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</h2>

          {isRegister && (
            <div>
              <label>Nombre de Usuario:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div>
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
          <button type="submit">
            {isRegister ? 'Registrarse' : 'Ingresar'}
          </button>
        </div>
      </form>

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? '¿Ya tienes una cuenta? Iniciar Sesión' : '¿No tienes una cuenta? Registrarse'}
      </button>
    </div>
  );
};

export default LoginPage;
