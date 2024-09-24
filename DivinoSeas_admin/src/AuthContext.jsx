import { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Aquí almacenaremos los datos del usuario

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData); // Guardamos los datos del usuario al hacer login
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Al cerrar sesión, limpiamos los datos del usuario
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
