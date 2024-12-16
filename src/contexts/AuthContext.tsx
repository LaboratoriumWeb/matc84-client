import { ReactNode, createContext, useState } from 'react';
import { UserModel } from '../model/user.model.ts';
import axios from '../api/axios.ts';
import { showMessage } from '../utils/message-handler.ts';

interface AuthContextData {
  isLoggedIn: boolean;
  user: UserModel | null;
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
  handleRegister: (name: string, email: string, password: string) => void;
  handleForgotPassword: (email: string) => void;
  handleResetPassword: (token: string, password: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = (props: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('token') !== null);
  const [user, setUser] = useState<UserModel | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        '/users/register',
        JSON.stringify({ name, email, password }),
        {
          headers: { 'Content-Type': 'application/json' }
      });
      setUser({
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email
      });
      setToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
    } catch (error: any) {
      let errorMessage;
      if (error.status === 400) {
        errorMessage = 'Ja existe um usuário associado a este e-mail';
      } else {
        errorMessage = 'Algo deu errado! Tente novamente mais tarde';
      }
      showMessage('error', errorMessage)
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        '/auth/login',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' }
        });
      setUser({
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email
      });
      setToken(response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
    } catch (error : any) {
      let errorMessage;
      if (error.status === 404) {
        errorMessage = 'Usuário não encontrado';
      } else if (error.status === 400) {
        errorMessage = 'Dados inválidos';
      } else {
        errorMessage = 'Algo deu errado! Tente novamente mais tarde';
      }
      showMessage('error', errorMessage)
    }
  }

  const handleForgotPassword = async (email: string) => {
    try {
      await axios.post(
        '/user/password-reset',
        JSON.stringify({ email }),
        {
          headers: { 'Content-Type': 'application/json' }
        });
      showMessage('success', 'Um email de recuperação foi enviado para o e-mail informado')
    } catch (error : any) {
      let errorMessage;
      if (error.status === 400) {
        errorMessage = 'Dados inválidos';
      } else {
        errorMessage = 'Algo deu errado! Tente novamente mais tarde';
      }
      showMessage('error', errorMessage)
    }
  }

  const handleResetPassword = async (resetToken: string, password: string) => {
    try {
      const response = await axios.post(
        '/user/reset-password/' + resetToken,
        password,
        {
          headers: { 'Content-Type': 'application/json' }
        });
    } catch (error : any) {
      let errorMessage;
      if (error.status === 400) {
        errorMessage = 'Token inválido ou expirado';
      } else {
        errorMessage = 'Algo deu errado! Tente novamente mais tarde';
      }
      showMessage('error', errorMessage)
    }
  }

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  const value = {
    isLoggedIn,
    user,
    handleLogin,
    handleLogout,
    handleRegister,
    handleForgotPassword,
    handleResetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
};

export {AuthProvider, AuthContext};