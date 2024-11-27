import React from 'react';
import { PlusCircle, UserCircle, LogOut } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { Profile } from './components/Profile';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { AuthLayout } from './components/AuthLayout';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface User {
  name: string;
  email: string;
}

type AuthScreen = 'login' | 'register' | 'forgot-password';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [authScreen, setAuthScreen] = React.useState<AuthScreen>('login');
  const [user, setUser] = React.useState<User | null>(null);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [newTodo, setNewTodo] = React.useState('');
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const handleLogin = (email: string, password: string) => {
    // In a real app, you would validate credentials with a backend
    setUser({ name: 'Usuário', email });
    setIsAuthenticated(true);
  };

  const handleRegister = (name: string, email: string, password: string) => {
    // In a real app, you would send this data to a backend
    setUser({ name, email });
    setIsAuthenticated(true);
  };

  const handleForgotPassword = (email: string) => {
    // In a real app, you would trigger a password reset email
    console.log('Password reset requested for:', email);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setTodos([]);
    setAuthScreen('login');
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setTodos([
      ...todos,
      { id: Date.now(), text: newTodo.trim(), completed: false }
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  if (!isAuthenticated) {
    const authTitles = {
      'login': 'Bem-vindo de volta!',
      'register': 'Criar nova conta',
      'forgot-password': 'Recuperar senha'
    };

    return (
      <AuthLayout title={authTitles[authScreen]}>
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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 p-4 sm:p-6 flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Minhas Tarefas</h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setIsProfileOpen(true)}
                className="text-white hover:text-blue-200 transition-colors"
              >
                <UserCircle size={28} />
              </button>
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-200 transition-colors"
                title="Sair"
              >
                <LogOut size={24} />
              </button>
            </div>
          </div>

          {/* Add Todo Form */}
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
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-50 text-sm text-gray-600">
            Total de tarefas: {todos.length} | Concluídas:{' '}
            {todos.filter(t => t.completed).length}
          </div>
        </div>
      </div>

      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}

export default App;