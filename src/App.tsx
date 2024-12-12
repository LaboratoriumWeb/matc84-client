import React, { useContext } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { AuthLayout } from './components/AuthLayout';
import { Home } from './components/Home.tsx';
import { AuthContext } from './contexts/AuthContext.tsx';


type AuthScreen = 'login' | 'register' | 'forgot-password';

function App() {
  const {user, handleLogin, handleRegister} = useContext(AuthContext);
  const [authScreen, setAuthScreen] = React.useState<AuthScreen>('login');

  const isAuthenticated = user != null;

  const handleForgotPassword = (email: string) => {
    // In a real app, you would trigger a password reset email
    console.log('Password reset requested for:', email);
  };

  // const handleLogout = () => {
  //   setUser(null);
  //   setIsAuthenticated(false);
  //   setAuthScreen('login');
  // };

  const authTitles = {
    'login': 'Bem-vindo de volta!',
    'register': 'Criar nova conta',
    'forgot-password': 'Recuperar senha'
  };

  return (
    <>
      {isAuthenticated
        ? <Home/>
        : <AuthLayout title={authTitles[authScreen]}>
          {authScreen === 'login' && (
            <Login
              onLogin={handleLogin}
              onSwitchToRegister={() => setAuthScreen('register')}
              onForgotPassword={() => setAuthScreen('forgot-password')}
            />
          )}
          {authScreen === 'register' && (
            <Register
              onRegister={handleRegister}
              onSwitchToLogin={() => setAuthScreen('login')}
            />
          )}
          {authScreen === 'forgot-password' && (
            <ForgotPassword
              onSubmit={handleForgotPassword}
              onBackToLogin={() => setAuthScreen('login')}
            />
          )}
        </AuthLayout>
      }
    </>
  );
}

export default App;