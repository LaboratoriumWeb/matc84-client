import React from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

export function Login({ onLogin, onSwitchToRegister, onForgotPassword }: LoginProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
            className="w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-blue-600 hover:underline"
        >
          Esqueceu sua senha?
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Entrar
      </button>

      <p className="text-center text-gray-600">
        Não tem uma conta?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-blue-600 hover:underline"
        >
          Cadastre-se
        </button>
      </p>
    </form>
  );
}