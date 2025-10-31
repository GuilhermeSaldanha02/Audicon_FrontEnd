import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterFormData) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('@audicon-cqc:token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

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

  // ADICIONAR ESTA NOVA FUNÇÃO
  async function register(data: RegisterFormData) {
    try {
      // Endpoint /users para criar o utilizador
      await api.post('/users', data);
      console.log('Utilizador registado com sucesso!');
    } catch (error) {
      console.error('Falha no registo', error);
      throw new Error('Não foi possível criar a conta. Verifique os dados.');
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}