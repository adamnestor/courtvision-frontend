import type { StatsRow } from "../../../types/stats";

interface StatsTableProps {
  data: StatsRow[];
  onRowClick: (playerId: number) => void;
}

export const StatsTable = ({ data, onRowClick }: StatsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th>Player</th>
            <th>Team</th>
            <th>Hit Rate</th>
            <th>Confidence</th>
            <th>Games</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr
              key={row.playerId}
              onClick={() => onRowClick(row.playerId)}
              className={`cursor-pointer hover:bg-gray-50 ${
                row.isHighConfidence ? "bg-green-50" : ""
              }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {row.playerName}
                </div>
                <div className="text-sm text-gray-500">{row.team}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{row.statLine}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{row.hitRate}%</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {row.confidenceScore}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{row.gamesPlayed}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {row.average.toFixed(1)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
