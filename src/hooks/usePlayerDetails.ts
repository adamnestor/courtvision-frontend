import { useQuery } from "@tanstack/react-query";
import { Category, TimePeriod } from "../types/dashboard";
import { PlayerDetailStats } from "../types/player";
import { api } from "../services/api";

interface UsePlayerDetailsProps {
  playerId: number;
  category?: Category;
  timePeriod?: TimePeriod;
}

export function usePlayerDetails({
  playerId,
  category = "POINTS",
  timePeriod = "L10",
}: UsePlayerDetailsProps) {
  return useQuery<PlayerDetailStats>({
    queryKey: ["playerDetails", playerId, category, timePeriod],
    queryFn: async () => {
      const response = await api.get(`/players/${playerId}/details`, {
        params: { category, timePeriod },
      });
      return response.data;
    },
  });
}
