interface TableHeaderProps {
  onSort: (field: string) => void;
  sortField: string;
  sortDirection: "asc" | "desc";
}

export const TableHeader = ({
  onSort,
  sortField,
  sortDirection,
}: TableHeaderProps) => {
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <thead>
      <tr>
        <th onClick={() => onSort("playerName")} className="cursor-pointer">
          Player {renderSortIcon("playerName")}
        </th>
        <th onClick={() => onSort("team")} className="cursor-pointer">
          Team {renderSortIcon("team")}
        </th>
        <th onClick={() => onSort("hitRate")} className="cursor-pointer">
          Hit Rate {renderSortIcon("hitRate")}
        </th>
      </tr>
    </thead>
  );
};
