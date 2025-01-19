import React from "react";
import { CheckCircle, InfoCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";

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

const StatsTable: React.FC<StatsTableProps> = ({ stats, handleRowClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
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
              className={cn(
                "hover:bg-muted cursor-pointer",
                stat.isHighConfidence && "bg-success/10"
              )}
              onClick={() => handleRowClick(stat.playerId)}
            >
              <td>{stat.playerName}</td>
              <td>{stat.team}</td>
              <td className="text-right">
                <div className="flex items-center gap-2">
                  <span>{stat.hitRate.toFixed(1)}%</span>
                  {stat.hitRate >= 70 && (
                    <CheckCircle className="w-4 h-4 text-success" />
                  )}
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      stat.confidenceScore >= 80 && "text-success font-medium",
                      stat.confidenceScore >= 60 &&
                        stat.confidenceScore < 80 &&
                        "text-warning",
                      stat.confidenceScore < 60 && "text-muted-foreground"
                    )}
                  >
                    {stat.confidenceScore}
                  </span>
                  <Tooltip content="Confidence score based on recent performance, matchup, and historical data">
                    <InfoCircle className="w-4 h-4 text-muted-foreground" />
                  </Tooltip>
                </div>
              </td>
              <td>{stat.gamesPlayed}</td>
              <td>{stat.average.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
