import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {AuthProvider} from './contexts/AuthContext.tsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Home} from './components/Home.tsx';
import {Login} from './components/Login.tsx';
import {Register} from './components/Register.tsx';
import {ForgotPassword} from './components/ForgotPassword.tsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import PublicRoute from './routes/PublicRoute.tsx';
import {ResetPassword} from './components/ResetPassword.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <ProtectedRoute>
        <Home/>
      </ProtectedRoute>
  },
  {
    path: "/login",
    element:
      <PublicRoute>
        <Login/>
      </PublicRoute>
  },
  {
    path: "/cadastrar",
    element:
      <PublicRoute>
        <Register/>
      </PublicRoute>
  },
  {
    path: '/esqueci-minha-senha',
    element:
      <PublicRoute>
        <ForgotPassword/>
      </PublicRoute>
  },
  {
    path: '/redefinir-senha',
    element:
      <PublicRoute>
        <ResetPassword/>
      </PublicRoute>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthProvider>
  </StrictMode>
);
