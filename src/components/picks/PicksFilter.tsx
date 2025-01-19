interface PicksFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const PicksFilter = ({
  activeFilter,
  onFilterChange,
}: PicksFilterProps) => {
  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onFilterChange("all")}
        className={`px-3 py-1 rounded ${
          activeFilter === "all" ? "bg-primary text-white" : "bg-muted"
        }`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange("active")}
        className={`px-3 py-1 rounded ${
          activeFilter === "active" ? "bg-primary text-white" : "bg-muted"
        }`}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange("completed")}
        className={`px-3 py-1 rounded ${
          activeFilter === "completed" ? "bg-primary text-white" : "bg-muted"
        }`}
      >
        Completed
      </button>
    </div>
  );
};
