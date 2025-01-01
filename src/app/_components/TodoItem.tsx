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
    <div className="group flex items-center gap-3 rounded-lg border border-zinc-700 bg-black/20 px-4 py-3 transition-colors hover:border-zinc-500">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo({ id: todo.id, completed: !todo.completed })}
        className="h-5 w-5 rounded border-zinc-500 bg-zinc-900 checked:bg-purple-600"
      />
      <span
        className={`flex-1 text-lg ${todo.completed ? "text-zinc-500 line-through" : "text-white"}`}
      >
        {todo.title}
      </span>
      <svg
        className="h-5 w-5 text-zinc-500 hover:text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => deleteTodo({ id: todo.id })}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
}
