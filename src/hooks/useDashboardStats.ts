import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../services/api";
import { Category, TimePeriod, Threshold } from "../types/dashboard";
import { Stats } from "../types/stats";

export const useDashboardStats = (params: {
  timePeriod: TimePeriod;
  category: Category;
  threshold: Threshold | null;
}): UseQueryResult<Stats.StatsRow[], Error> => {
  return useQuery<Stats.StatsRow[]>({
    queryKey: [
      "dashboardStats",
      params.timePeriod,
      params.category,
      params.threshold,
    ],
    queryFn: async () => {
      const response = await api.get("/dashboard/stats", { params });
      return response.data.data;
    },
  });
};
