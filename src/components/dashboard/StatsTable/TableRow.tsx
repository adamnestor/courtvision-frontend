interface TableRowProps {
  player: {
    id: string;
    name: string;
    team: string;
    hitRate: number;
  };
  onSelect: (id: string) => void;
}

export const TableRow = ({ player, onSelect }: TableRowProps) => {
  return (
    <tr
      onClick={() => onSelect(player.id)}
      className="hover:bg-muted/50 cursor-pointer"
    >
      <td>{player.name}</td>
      <td>{player.team}</td>
      <td>{player.hitRate}%</td>
    </tr>
  );
};
