import { TimePeriod, Category as DashboardCategory } from "./dashboard";

export interface PlayerInfo {
  playerId: number;
  firstName: string;
  lastName: string;
  teamAbbreviation: string;
  position: string;
}

export interface GamePerformance {
  gameId: number;
  gameDate: string;
  opponent: string;
  isHome: boolean;
  points: number;
  assists: number;
  rebounds: number;
  minutesPlayed: string;
  score: string;
  metThreshold: boolean;
  selectedStatValue: number;
}

export interface GameMetrics {
  maxValue: number;
  minValue: number;
  averageValue: number;
  totalGames: number;
  gamesAboveThreshold: number;
}

export interface StatsSummary {
  category: DashboardCategory;
  threshold: number;
  timePeriod: TimePeriod;
  hitRate: number;
  confidenceScore: number;
  average: number;
  successCount: number;
  failureCount: number;
}

export interface PlayerDetailStats {
  player: PlayerInfo;
  games: GamePerformance[];
  summary: StatsSummary;
  threshold: number;
  metrics: GameMetrics;
}

export interface GameResult {
  id: number;
  date: string;
  opponent: string;
  statValue: number;
  hitThreshold: boolean;
}

export type Category = "POINTS" | "ASSISTS" | "REBOUNDS";

export interface PlayerStats {
  hitRate: number;
  average: number;
  gamesPlayed: number;
}
