interface TodoFilterProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}

export function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div className="mb-4 flex gap-4">
      <button
        onClick={() => setFilter("all")}
        className={`${filter === "all" ? "text-blue-500" : "text-zinc-400"}`}
      >
        전체
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`${filter === "active" ? "text-blue-500" : "text-zinc-400"}`}
      >
        진행중
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`${filter === "completed" ? "text-blue-500" : "text-zinc-400"}`}
      >
        완료
      </button>
    </div>
  );
}
