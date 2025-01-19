import { Target, TrendingUp, History } from "lucide-react";
import { PlayerStats as PlayerStatsType } from "../../types/player";

interface PlayerStatsProps {
  stats: PlayerStatsType;
}

export const PlayerStats = ({ stats }: PlayerStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Target className="text-primary" size={20} />
          <h3 className="font-semibold">Hit Rate</h3>
        </div>
        <p className="text-2xl font-bold mt-2">{stats.hitRate}%</p>
        <p className="text-sm text-muted-foreground">Last 10 games</p>
      </div>

      <div className="bg-card rounded-lg p-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-primary" size={20} />
          <h3 className="font-semibold">Average</h3>
        </div>
        <p className="text-2xl font-bold mt-2">{stats.average}</p>
        <p className="text-sm text-muted-foreground">Season average</p>
      </div>

      <div className="bg-card rounded-lg p-4">
        <div className="flex items-center gap-2">
          <History className="text-primary" size={20} />
          <h3 className="font-semibold">Games Played</h3>
        </div>
        <p className="text-2xl font-bold mt-2">{stats.gamesPlayed}</p>
        <p className="text-sm text-muted-foreground">This season</p>
      </div>
    </div>
  );
};
