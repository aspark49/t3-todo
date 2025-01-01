"use client";

import { useEffect, useState } from "react";
import { TodoFilter } from "../_components/TodoFilter";
import { TodoInput } from "../_components/TodoInput";
import { TodoList } from "../_components/TodoList";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TodoPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 text-white">
      <div className="container max-w-2xl py-16">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="rounded-lg bg-white/10 px-4 py-2 font-medium transition-colors hover:bg-white/20"
          >
            ← 뒤로가기
          </button>
          <div className="text-zinc-400">
            {session.user?.name ?? session.user?.email}
          </div>
        </div>

        <h1 className="mb-12 text-center text-4xl font-bold">Todo App</h1>

        <div className="rounded-xl bg-black/30 p-6 shadow-xl">
          <TodoInput />
          <TodoFilter filter={filter} setFilter={setFilter} />
          <TodoList filter={filter} />
        </div>
      </div>
    </main>
  );
}
