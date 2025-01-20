import { describe, it, expect } from "vitest";
import {
  calculateDashboardStats,
  calculateHitRate,
  filterHighConfidence,
  sortByHitRate,
} from "./stats-utils";
import { StatsRow } from "../types/stats";

const mockStats: StatsRow[] = [
  {
    playerId: 1,
    playerName: "Player 1",
    team: "TEAM1",
    opponent: "OPP1",
    statLine: "20 PTS",
    hitRate: 75,
    confidenceScore: 80,
    gamesPlayed: 10,
    average: 22.5,
    isHighConfidence: true,
  },
  // Add more mock data...
];

const dashboardMockStats: StatsRow[] = [
  {
    playerId: 1,
    playerName: "John Doe",
    team: "TEAM1",
    opponent: "OPP1",
    statLine: "25 PTS",
    hitRate: 75,
    confidenceScore: 85,
    gamesPlayed: 10,
    average: 22.5,
    isHighConfidence: true,
  },
  {
    playerId: 2,
    playerName: "Jane Smith",
    team: "TEAM2",
    opponent: "OPP2",
    statLine: "8 AST",
    hitRate: 60,
    confidenceScore: 70,
    gamesPlayed: 8,
    average: 6.5,
    isHighConfidence: false,
  },
];

describe("stats-utils", () => {
  describe("calculateHitRate", () => {
    it("calculates correct hit rate for given stats", () => {
      const successes = 2;
      const total = 3;
      const hitRate = calculateHitRate(successes, total);
      expect(hitRate).toBe(66.67);
    });

    it("returns 0 for empty stats", () => {
      expect(calculateHitRate(0, 0)).toBe(0);
    });
  });

  describe("calculateDashboardStats", () => {
    it("calculates dashboard statistics correctly", () => {
      const result = calculateDashboardStats(dashboardMockStats);

      expect(result).toEqual({
        availablePicks: 2,
        highConfidencePicks: 1,
        gamesCount: 18,
        averageHitRate: 67.5,
      });
    });

    it("handles empty stats array", () => {
      const result = calculateDashboardStats([]);

      expect(result).toEqual({
        availablePicks: 0,
        highConfidencePicks: 0,
        gamesCount: 0,
        averageHitRate: 0,
      });
    });
  });

  describe("filterHighConfidence", () => {
    it("filters high confidence stats correctly", () => {
      const filteredStats = filterHighConfidence(mockStats);
      expect(filteredStats.length).toBe(1);
      expect(filteredStats[0].playerName).toBe("Player 1");
    });
  });

  describe("sortByHitRate", () => {
    it("sorts stats by hit rate correctly", () => {
      const sortedStats = sortByHitRate(mockStats);
      expect(sortedStats[0].playerName).toBe("Player 1");
    });
  });
});
