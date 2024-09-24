import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';
import "./LoginPage.css"; 


const users = [
  { id: "#1", image: "", user: "Fernando", mail: "Fernando@gmail.com", password: "1234", role: "Administrador" },
  { id: "#2", image: "", user: "Pablo", mail: "Pablo@gmail.com", password: "2345", role: "Gerente de Inventario" },
  { id: "#3", image: "", user: "Julio", mail: "Julio@gmail.com", password: "3456", role: "Encargado de Almacén" },
  { id: "#4", image: "", user: "Sofia", mail: "Sofia@gmail.com", password: "4567", role: "Supervisora de Tienda" },
  { id: "#5", image: "", user: "Joaquin", mail: "Joaquin@gmail.com", password: "5678", role: "Planificador de Compras" }
];

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    
    const user = users.find(u => u.mail === email && u.password === password);

    if (user) {
      login(); // Cambiar el estado a autenticado
      navigate('/Home'); // Redirigir a la página de inicio o donde desees
    } else {
      setError('Credenciales incorrectas. Intente de nuevo.');
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