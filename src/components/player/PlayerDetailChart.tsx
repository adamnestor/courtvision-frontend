import { PlayerDetailStats } from "../../types/player";

interface PlayerDetailChartProps {
  stats: PlayerDetailStats;
}

export const PlayerDetailChart = ({ stats }: PlayerDetailChartProps) => {
  console.log("Chart stats:", stats);
  console.log("Games:", stats.games);
  console.log("Sample game:", stats.games[0]);

  const { games, metrics, threshold } = stats;
  const maxDisplayValue = Math.ceil(metrics.maxValue * 1.1); // Add 10% padding

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      {/* Chart Container */}
      <div className="relative h-80">
        {/* Y-axis */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-sm text-gray-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="text-right pr-2">
              {Math.round(maxDisplayValue - (i * maxDisplayValue) / 4)}
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="ml-12 h-full flex items-end">
          {games.map((game) => {
            const height = (game.selectedStatValue / maxDisplayValue) * 100;
            return (
              <div
                key={game.gameId}
                className="flex-1 flex flex-col items-center"
              >
                {/* Bar */}
                <div
                  className={`w-8 ${
                    game.metThreshold ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ height: `${height}%` }}
                />
                {/* Game Info */}
                <div className="mt-2 text-xs text-gray-500 rotate-45">
                  {game.isHome ? "vs" : "@"} {game.opponent}
                </div>
              </div>
            );
          })}
        </div>

        {/* Threshold Line */}
        <div
          className="absolute left-12 right-0 border-t-2 border-red-500 border-dashed pointer-events-none"
          style={{
            bottom: `${(threshold / maxDisplayValue) * 100}%`,
          }}
        >
          <span className="absolute right-0 -top-4 text-xs text-red-500">
            {threshold}+
          </span>
        </div>
      </div>
    </div>
  );
};
