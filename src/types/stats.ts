export namespace Stats {
  export type Category = "POINTS" | "REBOUNDS" | "ASSISTS" | "THREES";

  export interface StatsRow {
    playerId: number;
    playerName: string;
    team: string;
    opponent: string;
    statLine: string;
    hitRate: number;
    confidenceScore: number;
    gamesPlayed: number;
    average: number;
    isHighConfidence: boolean;
  }

  export interface PlayerStats {
    playerId: number;
    playerName: string;
    team: string;
    category: Category;
    hitRate: number;
    confidenceScore: number;
    gamesPlayed: number;
    average: number;
    lastGames: number[];
    isHighConfidence: boolean;
  }

  export interface Pick {
    id: string;
    playerId: number;
    playerName: string;
    category: Category;
    threshold: number;
    hitRate: number;
    confidenceScore: number;
    result: boolean | null;
    createdAt: string;
  }

  export interface DashboardSummary {
    availablePicks: number;
    highConfidencePicks: number;
    gamesCount: number;
    averageHitRate: number;
  }
}
