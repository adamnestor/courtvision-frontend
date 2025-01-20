export interface UserPickDTO {
  id: number;
  playerId: number;
  playerName: string;
  team: string;
  opponent: string;
  category: string;
  threshold: number;
  hitRateAtPick: number;
  confidenceScore: number;
  result?: boolean;
  createdAt: string;
}

export interface Parlay {
  id: string;
  picks: UserPickDTO[];
  result?: boolean;
  createdAt: string;
}

export interface PickResponse {
  id: number;
  playerName: string;
  team: string;
  opponent: string;
  result: "WIN" | "LOSS" | null;
  confidenceScore: number;
}
