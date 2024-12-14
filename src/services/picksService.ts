// services/picksService.ts
import api from "./api";
import { ApiResponse } from "../types/api";
import { UserPickDTO, Parlay } from "../types/picks";

interface PicksResponse {
  singles: UserPickDTO[];
  parlays: Parlay[];
}

export const picksService = {
  async getUserPicks() {
    const response = await api.get<ApiResponse<PicksResponse>>("/picks");
    return response.data.data;
  },

  async deletePick(id: number) {
    const response = await api.delete<ApiResponse<void>>(`/picks/${id}`);
    return response.data;
  },

  async deleteParlay(id: string) {
    const response = await api.delete<ApiResponse<void>>(`/picks/parlay/${id}`);
    return response.data;
  },
};
