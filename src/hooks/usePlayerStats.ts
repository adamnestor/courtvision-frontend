import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { PlayerDetailStats } from "../types/player";
import { Category, TimePeriod, Threshold } from "../types/dashboard";

export const usePlayerStats = (
  playerId: number,
  timePeriod: TimePeriod,
  category: Category,
  threshold: Threshold
) => {
  return useQuery<PlayerDetailStats>({
    queryKey: ["playerStats", playerId, timePeriod, category, threshold],
    queryFn: async () => {
      const response = await api.get(`/api/players/${playerId}/stats`, {
        params: {
          timePeriod,
          category,
          threshold,
        },
      });
      return response.data.data;
    },
  });
};
