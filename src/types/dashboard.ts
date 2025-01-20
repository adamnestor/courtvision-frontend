export type TimePeriod = "L5" | "L10" | "L15" | "L20" | "SEASON";
export type Category = "ALL" | "POINTS" | "ASSISTS" | "REBOUNDS";
export type Threshold = number;

export interface StatsRow {
  playerId: number;
  playerName: string;
  team: string;
  opponent: string;
  statLine: string;
  hitRate: number;
  average: number;
  confidenceScore: number;
}
