export type StatsCategory = "POINTS" | "REBOUNDS" | "ASSISTS" | "THREES";

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
  isHighConfidence?: boolean;
}

export namespace Stats {
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
    isHighConfidence?: boolean;
  }

  export interface DashboardSummary {
    availablePicks: number;
    highConfidencePicks: number;
    gamesCount: number;
    averageHitRate: number;
  }
}

export interface PlayerStats {
  playerId: number;
  playerName: string;
  team: string;
  category: StatsCategory;
  hitRate: number;
  confidenceScore: number;
  gamesPlayed: number;
  average: number;
  lastGames: number[];
  isHighConfidence: boolean;
}

export interface StatsPick {
  id: string;
  playerId: number;
  playerName: string;
  category: StatsCategory;
  threshold: number;
  hitRate: number;
  confidenceScore: number;
  result: boolean | null;
  createdAt: string;
}
