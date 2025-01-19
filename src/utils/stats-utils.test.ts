import { describe, it, expect } from "vitest";
import { calculateDashboardStats, calculateHitRate } from "./stats-utils";

describe("stats-utils", () => {
  describe("calculateHitRate", () => {
    it("calculates correct hit rate for given stats", () => {
      const stats = [
        { value: 25, threshold: 20 },
        { value: 15, threshold: 20 },
        { value: 22, threshold: 20 },
      ];

      const hitRate = calculateHitRate(stats);
      expect(hitRate).toBe(66.67); // 2 out of 3 hits
    });

    it("returns 0 for empty stats array", () => {
      expect(calculateHitRate([])).toBe(0);
    });
  });

  describe("calculateDashboardStats", () => {
    it("calculates dashboard statistics correctly", () => {
      const mockStats = [
        {
          playerId: 1,
          playerName: "John Doe",
          category: "POINTS",
          hitRate: 75,
          gamesPlayed: 10,
          isHighConfidence: true,
        },
        {
          playerId: 2,
          playerName: "Jane Smith",
          category: "ASSISTS",
          hitRate: 60,
          gamesPlayed: 8,
          isHighConfidence: false,
        },
      ];

      const result = calculateDashboardStats(mockStats);

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
});
