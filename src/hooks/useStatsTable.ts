import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { StatsRow } from "../types/dashboard";

export function useStatsTable() {
  const { data: stats = [], isLoading } = useQuery<StatsRow[]>({
    queryKey: ["statsTable"],
    queryFn: async () => {
      const response = await api.get("/stats/table");
      return response.data;
    },
  });

  return {
    stats,
    isLoading,
  };
}
