import { PlusCircle } from "lucide-react";
import React, { useContext, useEffect } from "react";
import axios from "../api/axios.ts";
import { Header } from "../components/Header.tsx";
import { Profile } from "../components/Profile.tsx";
import { TodoItem } from "../components/TodoItem.tsx";
import { AuthContext } from "../contexts/AuthContext.tsx";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export function Home({ showUserList, setShowUserList }) {
  const { handleLogout, user } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [newTodo, setNewTodo] = React.useState("");
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const token = localStorage.getItem("token");

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post(
        "tasks",
        { description: newTodo.trim(), userId: user?.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response", response.data.task);
      setTodos([...todos, response.data.task]); // Adiciona a tarefa retornada pelo backend
      setNewTodo("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      // Lidar com o erro, ex: exibir uma mensagem para o usuário
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`tasks/user/all/${user?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("get response", response);
      setTodos(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      // Lidar com o erro, ex: exibir uma mensagem para o usuário
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []); // Executa apenas uma vez ao montar o componente

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <Header
            setShowUserList={setShowUserList}
            onLogout={handleLogout}
            onOpenProfile={() => setIsProfileOpen(true)}
            onUserList={"../components/UserList.tsx"}
          />
          {/* <UserList/> */}
          <form onSubmit={handleAddTodo} className="p-4 sm:p-6 border-b">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Adicionar nova tarefa..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
              >
                <PlusCircle size={20} />
                <span className="hidden sm:inline">Adicionar</span>
              </button>
            </div>
          </form>

          {/* Todo List */}
          <div className="divide-y">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Nenhuma tarefa adicionada ainda
              </p>
            ) : (
              todos.map((todo) => {
                console.log("todo", todo);
                return (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                );
              })
            )}
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-50 text-sm text-gray-600">
            Total de tarefas: {todos.length} | Concluídas:{" "}
            {todos.filter((t) => t.completed).length}
          </div>
        </div>
      </div>

      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
}
