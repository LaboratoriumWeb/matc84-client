import { Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";

export function UserListButton({ onClick }) {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");
  // const [showUserList, setShowUserList] = useState(false); // Estado para controlar a visibilidade

  const fetchUserRole = async () => {
    try {
      const response = await axios.get(`users/${user?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRole(response.data.user.role);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      // Lidar com o erro, ex: exibir uma mensagem para o usuário
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  if (role != "admin") {
    return null;
  }
  return (
    <>
      <button
        onClick={onClick}
        className="text-white hover:text-blue-200 transition-colors"
        title="Listar Usuários"
      >
        <Users size={24} />
      </button>
    </>
  );
}
