interface PlayerStats {
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

interface Pick {
  id: string;
  playerId: number;
  playerName: string;
  category: Category;
  threshold: number;
  hitRate: number;
  confidenceScore: number;
  result: boolean | null;
  createdAt: string;
  // ... other fields
}
