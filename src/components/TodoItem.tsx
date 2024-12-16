import { Check, Edit2, Trash2 } from "lucide-react";
import React from "react";

interface TodoItemProps {
  todo: {
    id: number;
    description: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.description);
  console.log("todo item", todo);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <button
          type="submit"
          className="p-2 text-green-600 hover:text-green-800"
        >
          <Check size={20} />
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-2 p-2 group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span
        className={`flex - 1 ${todo.completed ? "line-through text-gray-500" : ""
          } `}
      >
        {todo.description}
      </span>
      <button
        onClick={() => setIsEditing(true)}
        className="p-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Edit2 size={20} />
      </button>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}
