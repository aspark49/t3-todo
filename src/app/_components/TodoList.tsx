import { api } from "@/utils/api";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { data: todos, isLoading } = api.todo.getAll.useQuery();

  if (isLoading) return <div>로딩 중...</div>;
  if (!todos?.length) return <div>할 일이 없습니다.</div>;

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
