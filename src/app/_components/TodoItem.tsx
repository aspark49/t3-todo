import { api } from "@/utils/api";
import type { Todo } from "@prisma/client";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const utils = api.useUtils();
  const { mutate: updateTodo } = api.todo.update.useMutation({
    onSuccess: () => {
      void utils.todo.getAll.invalidate();
    },
  });
  const { mutate: deleteTodo } = api.todo.delete.useMutation({
    onSuccess: () => {
      void utils.todo.getAll.invalidate();
    },
  });

  return (
    <div className="flex items-center gap-2 rounded-md border border-zinc-800 px-4 py-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo({ id: todo.id, completed: !todo.completed })}
        className="h-4 w-4 rounded border-zinc-300"
      />
      <span
        className={`flex-1 ${todo.completed ? "text-zinc-500 line-through" : ""}`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => deleteTodo({ id: todo.id })}
        className="text-red-500 hover:text-red-700"
      >
        삭제
      </button>
    </div>
  );
}
