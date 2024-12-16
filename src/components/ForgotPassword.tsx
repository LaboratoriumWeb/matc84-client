import React, { useContext, useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { handleForgotPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleForgotPassword(email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-green-50 text-green-800 p-4 rounded-lg">
          <p>Um email de recuperação foi enviado para:</p>
          <p className="font-medium">{email}</p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="text-blue-600 hover:underline flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft size={16} />
          Voltar para o login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-center">
        Digite seu email para receber as instruções de recuperação de senha
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
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

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enviar instruções
        </button>
      </form>

      <button
        onClick={() => navigate('/login')}
        className="text-blue-600 hover:underline flex items-center justify-center gap-2 mx-auto"
      >
        <ArrowLeft size={16} />
        Voltar para o login
      </button>
    </div>
  );
}