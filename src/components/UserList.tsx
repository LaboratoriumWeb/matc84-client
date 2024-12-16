import { ArrowLeftFromLine, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { AuthContext } from "../contexts/AuthContext";
import { UserModel } from "../model/user.model";
import { userService } from "../services/userService";

export function UserList() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const { user } = useContext(AuthContext);
  // const history = useNavigate();
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response", response);
      setIsLoading(true);
      setError(null);
      setUsers(response.data.users);
      // setRole(response.data.user.role);
    } catch (error) {
      setError("Erro ao carregar usuários. Tente novamente mais tarde."); // Lidar com o erro, ex: exibir uma mensagem para o usuário
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`users/${users?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== userId));

      // setRole(response.data.user.role);
    } catch (error) {
      setError("Erro ao carregar usuários. Tente novamente mais tarde."); // Lidar com o erro, ex: exibir uma mensagem para o usuário
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  async function handleDeleteUser(userId: string) {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) {
      return;
    }

    try {
      await userService.deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      alert("Erro ao excluir usuário. Tente novamente.");
      console.error("Error deleting user:", err);
    }
  }

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  // if (error) {
  //   return <ErrorMessage message={error} />;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex items-center text-center gap-10 bg-blue-600 p-4 sm:p-6">
            <button>
              <ArrowLeftFromLine color="white" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Lista de Usuários
            </h1>
          </div>

          <div className="p-4 sm:p-6">
            {users.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Nenhum usuário encontrado
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === "admin"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role === "admin" ? "Admin" : "Usuário"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => deleteUser(users.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Excluir usuário"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
