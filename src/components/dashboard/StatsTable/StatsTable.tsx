import React from "react";
import { cn } from "@/lib/utils";

interface StatsTableProps {
  stats: {
    playerId: string;
    playerName: string;
    team: string;
    hitRate: number;
    confidenceScore: number;
    gamesPlayed: number;
    average: number;
    isHighConfidence: boolean;
  }[];
  handleRowClick: (playerId: string) => void;
}

export const StatsTable: React.FC<StatsTableProps> = ({
  stats,
  handleRowClick,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left" data-testid="stats-table">
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
        <tbody>
          {stats.map((stat) => (
            <tr
              key={stat.playerId}
              data-testid="player-row"
              className={cn(
                "hover:bg-muted cursor-pointer",
                stat.isHighConfidence && "bg-success/10"
              )}
              onClick={() => handleRowClick(stat.playerId)}
            >
              <td>{stat.playerName}</td>
              <td>{stat.team}</td>
              <td>{stat.hitRate.toFixed(1)}%</td>
              <td>{stat.confidenceScore}</td>
              <td>{stat.gamesPlayed}</td>
              <td>{stat.average.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
