import { ReactNode, createContext, useState } from 'react';
import { UserModel } from '../model/user.model.ts';

interface AuthContextData {
  user: UserModel | null;
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
  handleRegister: (name: string, email: string, password: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<UserModel | null>(null);

  const handleRegister = (name: string, email: string, password: string) => {
    // In a real app, you would send this data to a backend
    setUser({ name, email });
  };

  const handleLogin = (email: string, password: string) => {
    // request backend volta usuario e chama o setUser
    setUser({ name: 'Usuário', email });
  }

  const handleLogout = () => {
    setUser(null);
  }

  const value = {
    user,
    handleLogin,
    handleLogout,
    handleRegister
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
};

export {AuthProvider, AuthContext};