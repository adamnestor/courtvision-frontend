interface FilterButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

export const FilterButton = ({ active, label, onClick }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded ${
        active ? "bg-primary text-white" : "bg-muted"
      }`}
    >
      {label}
    </button>
  );
};
