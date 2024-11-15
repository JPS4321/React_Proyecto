import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Cargar estado de autenticación desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("Usuario cargado desde localStorage:", storedUser);
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    console.log("Datos recibidos en login:", userData); // Debug para ver qué llega del backend
    setIsAuthenticated(true);
    setUser(userData); // Guardar todos los datos del usuario en el estado
    localStorage.setItem('user', JSON.stringify(userData)); // Guardar todos los datos del usuario en localStorage
    localStorage.setItem('token', token); // Guardar el token en localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user'); // Limpiar usuario de localStorage
    localStorage.removeItem('token'); // Limpiar token de localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
