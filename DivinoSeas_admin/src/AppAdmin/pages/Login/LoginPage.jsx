import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';
import axios from 'axios';
import './LoginPage.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); 
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirigir si ya hay un usuario autenticado
  useEffect(() => {
    if (user) {
      navigate('/Home');
    }
  }, [user, navigate]);

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
        password_hashed: password,
        is_admin: false,
        role: 'user',
      });

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
      <form onSubmit={isRegister ? handleRegister : handleLogin} className="login-form">
        <h2>{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</h2>

        {isRegister && (
          <div className="form-group">
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="btn-submit">
          {isRegister ? 'Registrarse' : 'Ingresar'}
        </button>
      </form>

      <button onClick={() => setIsRegister(!isRegister)} className="toggle-btn">
        {isRegister ? '¿Ya tienes una cuenta? Iniciar Sesión' : '¿No tienes una cuenta? Registrarse'}
      </button>
    </div>
  );
};

export default LoginPage;
