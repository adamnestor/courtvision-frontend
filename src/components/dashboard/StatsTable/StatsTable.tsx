import { useState, useEffect } from "react";
import { StatsRow } from "../../../types/dashboard";
import { StatsTableHeader } from "./StatsTableHeader.tsx";
import { StatsTableRow } from "./StatsTableRow.tsx";

export const StatsTable = () => {
  const [stats, setStats] = useState<StatsRow[]>([]);
  // Mock data for now
  const mockData: StatsRow[] = [
    {
      playerId: 1,
      playerName: "Nikola Jokić",
      team: "DEN",
      opponent: "vs LAL",
      statLine: "Points 20+",
      hitRate: 89,
      average: 28.4,
    },
    {
      playerId: 1,
      playerName: "Nikola Jokić",
      team: "DEN",
      opponent: "vs LAL",
      statLine: "Assists 6+",
      hitRate: 85,
      average: 8.2,
    },
  ];

  useEffect(() => {
    // TODO: Replace with API call
    setStats(mockData);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <StatsTableHeader />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {stats.map((stat, index) => (
          <StatsTableRow
            key={`${stat.playerId}-${stat.statLine}`}
            stat={stat}
          />
        ))}
      </div>
    </div>
  );
};
