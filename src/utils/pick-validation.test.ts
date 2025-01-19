import { describe, it, expect } from "vitest";
import {
  validatePick,
  validateParlay,
  calculateParlayOdds,
  isValidThreshold,
} from "./pick-validation";
import { CreatePickRequest, Category } from "../types/picks";

describe("pick-validation", () => {
  const validPick: CreatePickRequest = {
    playerId: 1,
    category: "POINTS" as Category,
    threshold: 20,
    gameId: "game123",
    hitRateAtPick: 65.5,
  };

  describe("validatePick", () => {
    it("validates a correct pick", () => {
      const result = validatePick(validPick);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("rejects invalid threshold values", () => {
      const invalidPick = { ...validPick, threshold: -5 };
      const result = validatePick(invalidPick);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Threshold must be a positive number");
    });

    it("validates category-specific thresholds", () => {
      const picks = [
        { ...validPick, category: "POINTS" as Category, threshold: 50 }, // Valid
        { ...validPick, category: "ASSISTS" as Category, threshold: 15 }, // Valid
        { ...validPick, category: "POINTS" as Category, threshold: 100 }, // Invalid
        { ...validPick, category: "ASSISTS" as Category, threshold: 25 }, // Invalid
      ];

      expect(validatePick(picks[0]).isValid).toBe(true);
      expect(validatePick(picks[1]).isValid).toBe(true);
      expect(validatePick(picks[2]).isValid).toBe(false);
      expect(validatePick(picks[3]).isValid).toBe(false);
    });

    it("requires minimum hit rate", () => {
      const lowHitRatePick = { ...validPick, hitRateAtPick: 30 };
      const result = validatePick(lowHitRatePick);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain("Hit rate must be at least 50%");
    });
  });

  describe("validateParlay", () => {
    it("validates a valid parlay", () => {
      const parlay = [
        validPick,
        { ...validPick, playerId: 2, category: "ASSISTS" as Category },
      ];
      const result = validateParlay(parlay);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("rejects parlays with duplicate players", () => {
      const parlay = [
        validPick,
        { ...validPick, category: "ASSISTS" as Category },
      ];
      const result = validateParlay(parlay);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        "Cannot have multiple picks for same player"
      );
    });

    it("enforces minimum and maximum parlay size", () => {
      const singlePick = [validPick];
      const largeParly = Array(6)
        .fill(validPick)
        .map((pick, i) => ({
          ...pick,
          playerId: i + 1,
        }));

      expect(validateParlay(singlePick).isValid).toBe(false);
      expect(validateParlay(largeParly).isValid).toBe(false);
    });
  });

  describe("calculateParlayOdds", () => {
    it("calculates correct parlay odds", () => {
      const picks = [
        { ...validPick, hitRateAtPick: 70 },
        { ...validPick, playerId: 2, hitRateAtPick: 60 },
      ];

      const odds = calculateParlayOdds(picks);
      expect(odds).toBe(42); // 0.7 * 0.6 * 100
    });

    it("returns 0 for empty picks array", () => {
      expect(calculateParlayOdds([])).toBe(0);
    });
  });

  describe("isValidThreshold", () => {
    it("validates thresholds for different categories", () => {
      // Points thresholds
      expect(isValidThreshold("POINTS", 15)).toBe(true);
      expect(isValidThreshold("POINTS", 60)).toBe(true);
      expect(isValidThreshold("POINTS", 80)).toBe(false);

      // Assists thresholds
      expect(isValidThreshold("ASSISTS", 5)).toBe(true);
      expect(isValidThreshold("ASSISTS", 15)).toBe(true);
      expect(isValidThreshold("ASSISTS", 20)).toBe(false);

      // Rebounds thresholds
      expect(isValidThreshold("REBOUNDS", 5)).toBe(true);
      expect(isValidThreshold("REBOUNDS", 20)).toBe(true);
      expect(isValidThreshold("REBOUNDS", 30)).toBe(false);
    });

    it("handles invalid categories", () => {
      expect(isValidThreshold("INVALID" as Category, 10)).toBe(false);
    });
  });
});
