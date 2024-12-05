import { PlayerDetailStats } from "../../types/player";

interface PlayerDetailHeaderProps {
  stats: PlayerDetailStats;
}

export const PlayerDetailHeader = ({ stats }: PlayerDetailHeaderProps) => {
  const { player, summary } = stats;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {player.firstName} {player.lastName}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {player.teamAbbreviation} | {player.position}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Hit Rate ({summary.threshold}+ {summary.category.toLowerCase()})
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {summary.hitRate.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Avg: {summary.average.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};
