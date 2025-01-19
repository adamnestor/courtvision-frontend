import { PickCategory } from "./parlay";

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface CreatePickRequest {
  playerId: number;
  category: PickCategory;
  threshold: number;
  hitRateAtPick: number;
  isParlay: boolean;
}

export interface PickResponse {
  id: number;
  playerId: number;
  category: PickCategory;
  threshold: number;
  hitRateAtPick: number;
  isParlay: boolean;
  parlayId?: number;
  playerName: string;
  team: string;
  opponent: string;
  result?: "WIN" | "LOSS";
  createdAt: string;
  confidenceScore: number;
}

export interface AdminStatsResponse {
  totalUsers: number;
  activeUsers: number;
  systemHealth: {
    apiStatus: "healthy" | "degraded" | "down";
    lastCheck: string;
  };
  performanceMetrics: {
    averageResponseTime: number;
    uptime: number;
  };
}

export interface ErrorResponse {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
  timestamp: string;
}

export interface PlayerStatsResponse {
  confidenceScore: number;
}
