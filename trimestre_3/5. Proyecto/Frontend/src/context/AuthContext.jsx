import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const decodedUser = await authService.login(email, password);
      setUser(decodedUser);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw error;
    }
  };

  const logout = () => {
    authService.logout(); // Llama a la función logout del servicio authService
    setUser(null); // Actualiza el estado user a null
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = authService.getToken();
      if (token) {
        const decodedUser = authService.decodeToken(token);
        setUser(decodedUser);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
