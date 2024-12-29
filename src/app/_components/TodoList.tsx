import { api } from "@/utils/api";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  filter: "all" | "active" | "completed";
}

export function TodoList({ filter }: TodoListProps) {
  const { data: todos, isLoading } = api.todo.getAll.useQuery();

  const filteredTodos = todos?.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  if (isLoading) {
    return <div className="text-center text-white">로딩 중...</div>;
  }

  if (!filteredTodos?.length) {
    return <div className="text-center text-white">할 일이 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
