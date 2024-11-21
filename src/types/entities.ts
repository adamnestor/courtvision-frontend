export interface Team {
  id: number;
  externalId: number;
  name: string;
  abbreviation: string;
  city: string;
  conference: "East" | "West";
  division: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Player {
  id: number;
  externalId: number;
  firstName: string;
  lastName: string;
  teamId: number;
  position: string;
  jerseyNumber: string;
  status: "ACTIVE" | "INACTIVE" | "INJURED";
  createdAt: Date;
  updatedAt: Date;
  team?: Team;
}

export interface Game {
  id: number;
  externalId: number;
  homeTeamId: number;
  awayTeamId: number;
  gameDate: Date;
  season: number;
  status: "SCHEDULED" | "LIVE" | "FINAL";
  period: number;
  homeTeamScore: number;
  awayTeamScore: number;
  createdAt: Date;
  updatedAt: Date;
  homeTeam?: Team;
  awayTeam?: Team;
}

export interface GameStats {
  id: number;
  playerId: number;
  gameId: number;
  minutesPlayed: string;
  points: number;
  assists: number;
  rebounds: number;
  createdAt: Date;
  player?: Player;
  game?: Game;
}

export interface HitRate {
  id: number;
  playerId: number;
  category: "POINTS" | "ASSISTS" | "REBOUNDS";
  threshold: number;
  timePeriod: "L5" | "L10" | "L15" | "L20" | "SEASON";
  hitRate: number;
  average: number;
  gamesCounted: number;
  lastCalculated: Date;
  createdAt: Date;
  player?: Player;
}
