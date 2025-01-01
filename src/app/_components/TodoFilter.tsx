interface TodoFilterProps {
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}

export function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div className="mb-6 flex justify-center gap-4">
      {["all", "active", "completed"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f as "all" | "active" | "completed")}
          className={`rounded-full px-4 py-1 text-sm font-medium transition-colors ${
            filter === f
              ? "bg-purple-600 text-white"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          {f === "all" ? "전체" : f === "active" ? "진행중" : "완료"}
        </button>
      ))}
    </div>
  );
}
