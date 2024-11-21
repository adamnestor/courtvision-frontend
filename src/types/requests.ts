export interface HitRateRequest {
  playerId: number;
  category: "POINTS" | "ASSISTS" | "REBOUNDS";
  threshold: number;
  timePeriod: "L5" | "L10" | "L15" | "L20" | "SEASON";
}

export interface GameStatsFilter {
  playerId?: number;
  startDate?: Date;
  endDate?: Date;
  category?: "POINTS" | "ASSISTS" | "REBOUNDS";
  threshold?: number;
}
