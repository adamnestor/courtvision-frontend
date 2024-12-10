import api from "./api";
import { ApiResponse, PickResponse } from "../types/api";
import { UserPickDTO, Parlay } from "../types/picks";

export const transformToUserPickDTO = (pick: PickResponse): UserPickDTO => ({
  id: pick.id,
  playerId: pick.playerId,
  playerName: pick.playerName,
  team: pick.team,
  opponent: pick.opponent,
  category: pick.category,
  threshold: pick.threshold,
  hitRateAtPick: pick.hitRateAtPick,
  result:
    pick.result === "WIN" ? true : pick.result === "LOSS" ? false : undefined,
  createdAt: pick.createdAt,
});

export const transformToParlay = (picks: PickResponse[]): Parlay[] => {
  const parlayGroups = picks.reduce(
    (groups: { [key: number]: PickResponse[] }, pick) => {
      if (pick.parlayId) {
        if (!groups[pick.parlayId]) {
          groups[pick.parlayId] = [];
        }
        groups[pick.parlayId].push(pick);
      }
      return groups;
    },
    {}
  );

  return Object.entries(parlayGroups).map(([parlayId, picks]) => ({
    id: parseInt(parlayId),
    picks: picks.map(transformToUserPickDTO),
    result: picks.every((p) => p.result === "WIN")
      ? true
      : picks.some((p) => p.result === "LOSS")
      ? false
      : undefined,
    createdAt: picks[0].createdAt,
  }));
};

export const picksService = {
  async getUserPicks() {
    const response = await api.get<ApiResponse<PickResponse[]>>("/picks");
    const picks = response.data.data;

    const singles = picks
      .filter((pick) => !pick.isParlay)
      .map(transformToUserPickDTO);

    const parlays = transformToParlay(picks.filter((pick) => pick.isParlay));

    return {
      singles,
      parlays,
    };
  },
};
