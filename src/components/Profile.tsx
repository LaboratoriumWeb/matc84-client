import { Camera, Lock, Mail, User } from "lucide-react";
import React, { useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Profile({ isOpen, onClose }: ProfileProps) {
  const { user } = useContext(AuthContext);
  const [name, setName] = React.useState(user?.name);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [avatar, setAvatar] = React.useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150&q=80"
  );
  const token = localStorage.getItem("token");
  console.log("token", token);
  console.log("user", user);
  const handleSubmit = async () => {
    console.log("name, email, password", name, email, password);
    try {
      console.log("entrou", user?.id);
      await axios.put(
        `users/${user?.id}`,
        {
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Trate o sucesso da atualização, ex: exibir uma mensagem de sucesso
      console.log("salvou");
      onClose(); // Fecha o modal após a atualização
    } catch (error) {
      // Trate o erro da atualização, ex: exibir uma mensagem de erro
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Editar Perfil</h2>

        <div className="relative w-32 h-32 mx-auto mb-6">
          <img
            src={avatar}
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
            <Camera size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu nome"
            />
          </div>

          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu email"
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sua senha"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
