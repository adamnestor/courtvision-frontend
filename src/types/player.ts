import { Category, TimePeriod } from "./dashboard";

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
  category: Category;
  threshold: number;
  timePeriod: TimePeriod;
  hitRate: number;
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
