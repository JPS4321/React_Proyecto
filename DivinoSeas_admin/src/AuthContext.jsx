import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Cargar estado de autenticación desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // Limpia `localStorage` si hay datos inconsistentes
    if (!storedUser || !token) {
      clearLocalStorage();
    } else {
      console.log("Usuario cargado desde localStorage:", storedUser);
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData, token) => {
    console.log("Datos recibidos en login:", userData);
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); // Sobrescribe `user`
    localStorage.setItem('token', token); // Sobrescribe el `token`
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    clearLocalStorage();
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
