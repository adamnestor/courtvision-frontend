import { StatsRow } from "../types/stats";

export function calculateHitRate(successes: number, total: number): number {
  return total === 0 ? 0 : (successes / total) * 100;
}

export function filterHighConfidence(stats: StatsRow[]): StatsRow[] {
  return stats.filter((stat) => stat.confidenceScore >= 75);
}

export function sortByHitRate(stats: StatsRow[]): StatsRow[] {
  return [...stats].sort((a, b) => b.hitRate - a.hitRate);
}

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
