import { PickCategory } from "./parlay";

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
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
  result?: "WIN" | "LOSS";
  createdAt: string;
}
