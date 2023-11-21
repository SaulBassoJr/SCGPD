// AuthContext.js

import { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const login = () => {
    // Lógica para autenticar o usuário
    setIsUserAuthenticated(true);
  };

  const logout = () => {
    // Lógica para desautenticar o usuário
    setIsUserAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isUserAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth, AuthContext };
