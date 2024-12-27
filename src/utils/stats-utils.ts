import { StatsRow } from "../types/dashboard";

export const calculateDashboardStats = (stats: StatsRow[]) => {
  // Calculate number of available picks
  const availablePicks = stats.length;

  // Calculate number of high confidence picks (80%+ hit rate)
  const highConfidencePicks = stats.filter((stat) => stat.hitRate >= 80).length;

  // Get unique games today by looking at opponent field
  const uniqueGames = new Set(stats.map((stat) => stat.opponent)).size;

  return {
    availablePicks,
    highConfidencePicks,
    gamesCount: Math.ceil(uniqueGames / 2),
  };
};
