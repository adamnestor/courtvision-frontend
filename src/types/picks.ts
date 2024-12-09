export interface UserPickDTO {
  id: number;
  playerId: number;
  playerName: string;
  team: string;
  opponent: string;
  category: string;
  threshold: number;
  hitRateAtPick: number;
  result?: boolean;
  createdAt: string;
}

export interface Parlay {
  id: number;
  picks: UserPickDTO[];
  result?: boolean;
  createdAt: string;
}
