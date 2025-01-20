import { Category as DashboardCategory } from "../types/dashboard";

export type ValidCategory = Exclude<DashboardCategory, "ALL">;

export interface CreatePickRequest {
  playerId: number;
  category: ValidCategory;
  threshold: number;
  hitRateAtPick: number;
  isParlay: boolean;
  gameId?: string;
}

export function validatePick(pick: CreatePickRequest) {
  const errors: string[] = [];
  if (pick.hitRateAtPick < 50) {
    errors.push("Hit rate must be at least 50%");
  }
  if (!isValidThreshold(pick.category, pick.threshold)) {
    errors.push("Invalid threshold for category");
  }
  return { isValid: errors.length === 0, errors };
}

export function validateParlay(picks: CreatePickRequest[]) {
  const errors: string[] = [];
  if (picks.length < 2 || picks.length > 5) {
    errors.push("Parlay must have between 2 and 5 picks");
  }
  const playerIds = new Set(picks.map((p) => p.playerId));
  if (playerIds.size !== picks.length) {
    errors.push("Cannot have multiple picks for same player");
  }
  return { isValid: errors.length === 0, errors };
}

export function calculateParlayOdds(picks: CreatePickRequest[]): number {
  if (picks.length === 0) return 0;
  return (
    picks.reduce((odds, pick) => odds * (pick.hitRateAtPick / 100), 1) * 100
  );
}

export function isValidThreshold(
  category: ValidCategory,
  threshold: number
): boolean {
  const limits = {
    POINTS: { min: 10, max: 60 },
    ASSISTS: { min: 3, max: 15 },
    REBOUNDS: { min: 5, max: 20 },
  } as const;
  const limit = limits[category];
  return limit ? threshold >= limit.min && threshold <= limit.max : false;
}

export function validatePickRequest(request: CreatePickRequest): boolean {
  return (
    typeof request.playerId === "number" &&
    request.playerId > 0 &&
    ["POINTS", "ASSISTS", "REBOUNDS"].includes(request.category) &&
    typeof request.threshold === "number" &&
    request.threshold > 0 &&
    typeof request.hitRateAtPick === "number" &&
    request.hitRateAtPick >= 0 &&
    request.hitRateAtPick <= 100 &&
    typeof request.isParlay === "boolean"
  );
}
