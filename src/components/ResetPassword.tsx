import {ArrowLeft, Eye, EyeOff, Lock} from 'lucide-react';
import {AuthContext} from '../contexts/AuthContext.tsx';
import {useContext, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {AuthLayout} from './AuthLayout.tsx';
import {showMessage} from '../utils/message-handler.ts';

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { handleResetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showMessage('error', 'As senhas não coincidem');
      return;
    }
    if (resetToken) {
      handleResetPassword(resetToken, password);
    }
  }

  return (
    <AuthLayout title='Recuperar senha'>
      <div className="space-y-6">
        <p className="text-gray-600 text-center">
          Redefina sua senha abaixo
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crie uma senha forte"
              className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Digite a senha novamente"
              className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Redefinir senha
          </button>
        </form>

        <button
          onClick={() => navigate('/login')}
          className="text-blue-600 hover:underline flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft size={16}/>
          Voltar para o login
        </button>
      </div>
    </AuthLayout>
  )
}