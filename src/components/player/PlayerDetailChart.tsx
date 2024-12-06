import { PlayerDetailStats } from "../../types/player";

interface PlayerDetailChartProps {
  stats: PlayerDetailStats;
  statType: "points" | "assists" | "rebounds";
}

export const PlayerDetailChart = ({
  stats,
  statType,
}: PlayerDetailChartProps) => {
  const { games, threshold } = stats;

  const getNextInterval = (value: number, stepSize: number) => {
    return Math.ceil(value / stepSize) * stepSize;
  };

  // First get the stepSize based on stat type
  const stepSize = statType === "points" ? 5 : 2;

  // Get the highest value needed (max of: highest stat value or threshold)
  const highestValue = Math.max(
    ...games.map((g) => g.selectedStatValue),
    threshold
  );

  // Get the next interval above that value
  const maxDisplayValue = getNextInterval(highestValue, stepSize);

  const getYAxisValues = (maxValue: number, stepSize: number) => {
    const values = [];
    for (let value = 0; value <= maxValue; value += stepSize) {
      values.push({
        value,
        position: (value / maxValue) * 100,
      });
    }
    return values;
  };

  const thresholdHeight = (threshold / maxDisplayValue) * 100;
  const yAxisValues = getYAxisValues(maxDisplayValue, stepSize);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      {/* Chart Container */}
      <div className="relative w-full" style={{ height: "320px" }}>
        {/* Y-axis */}
        <div className="absolute left-0 top-0 bottom-0 w-12">
          {yAxisValues.map(({ value, position }, i) => (
            <div
              key={i}
              className="absolute right-0 text-sm text-gray-500 pr-2"
              style={{
                bottom: `${position}%`,
                transform: "translateY(50%)",
              }}
            >
              {value}
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="ml-12 h-full flex items-end gap-1">
          {[...games].reverse().map((game) => {
            const height = (game.selectedStatValue / maxDisplayValue) * 100;
            const date = new Date(game.gameDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            return (
              <div
                key={game.gameId}
                className="flex-1 flex flex-col items-center justify-end relative min-w-[30px] h-full"
              >
                {game.selectedStatValue > 0 && (
                  <div
                    className={`w-full max-w-24 min-h-[2px] ${
                      game.selectedStatValue >= threshold
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                )}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap px-1 flex flex-col items-center ${
                    game.selectedStatValue > 0
                      ? "text-white dark:text-white"
                      : "text-gray-700 dark:text-white"
                  }`}
                >
                  <span>
                    {!game.isHome && "@"}
                    {game.opponent}
                  </span>
                  <span className="text-[8px] opacity-75">{date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Threshold Line */}
        <div
          className="absolute left-12 right-0 border-t-2 border-red-500 border-dashed pointer-events-none"
          style={{
            bottom: `${thresholdHeight}%`,
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
