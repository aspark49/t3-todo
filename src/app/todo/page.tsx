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
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="text-while absolute right-4 top-4">
        {session.user?.name ?? session.user?.email}
      </div>

      <button
        onClick={() => router.back()}
        className="absolute left-4 top-4 rounded-xl bg-white/10 px-4 py-2 font-semibold text-white no-underline transition hover:bg-white/20"
      >
        ← 뒤로가기
      </button>

      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Todo App
        </h1>
        <div className="w-full max-w-md">
          <TodoInput />
          <TodoFilter filter={filter} setFilter={setFilter} />
          <TodoList filter={filter} />
        </div>
      </div>
    </main>
  );
}
