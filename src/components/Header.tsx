import { LogOut, UserCircle } from "lucide-react";
import { UserListButton } from "./UserListButton";

interface HeaderProps {
  onOpenProfile: () => void;
  onLogout: () => void;
  onUserList: any;
  setShowUserList: (show: boolean) => void;
}

export function Header({
  onOpenProfile,
  onLogout,
  onUserList,
  setShowUserList,
  showUserList,
}: HeaderProps) {
  return (
    <div className="bg-blue-600 p-4 sm:p-6 flex justify-between items-center">
      <h1 className="text-xl sm:text-2xl font-bold text-white">
        Minhas Tarefas
      </h1>
      <div className="flex items-center gap-2 sm:gap-4">
        <UserListButton onClick={() => setShowUserList(!showUserList)} />
        <button
          onClick={onOpenProfile}
          className="text-white hover:text-blue-200 transition-colors"
        >
          <UserCircle size={28} />
        </button>
        <button
          onClick={onLogout}
          className="text-white hover:text-blue-200 transition-colors"
          title="Sair"
        >
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
}
