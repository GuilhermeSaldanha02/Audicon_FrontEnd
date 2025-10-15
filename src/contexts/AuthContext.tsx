import { createContext, ReactNode, useContext, useState } from 'react';
import api from '../services/api';

interface AuthContextData {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { data } = response.data; // API retorna { statusCode, data }

      if (data?.access_token) {
        localStorage.setItem('@audicon-cqc:token', data.access_token);
        api.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
        setIsAuthenticated(true);
        console.log('Login bem-sucedido, token guardado!');
      }
    } catch (error) {
      console.error('Falha no login', error);
      throw new Error('Email ou senha inválidos');
    }
  }

  function logout() {
    localStorage.removeItem('@audicon-cqc:token');
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}