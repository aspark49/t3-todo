import { api } from "@/utils/api";
import { useState } from "react";

export function TodoInput() {
  const [title, setTitle] = useState("");
  const utils = api.useUtils();
  const { mutate: createTodo, isPending } = api.todo.create.useMutation({
    onSuccess: () => {
      setTitle("");
      // Todo 목록 새로고침
      void utils.todo.getAll.invalidate();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createTodo({ title });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="lex-1 rounded-md border-2 border-zinc-800 bg-black/10 px-4 py-2"
        disabled={isPending}
      />
      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-zinc-800 px-4 py-2 text-white hover:bg-zinc-700 disabled:opacity-50"
      >
        추가
      </button>
    </form>
  );
}
