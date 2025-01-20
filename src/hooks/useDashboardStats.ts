import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../services/api";
import { Category, TimePeriod, Threshold } from "../types/dashboard";
import { Stats } from "../types/stats";

interface DashboardParams {
  timePeriod: TimePeriod;
  category: Category;
  threshold: Threshold | null;
}

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
      const response = await api.get("/dashboard/stats", {
        params: {
          timePeriod: params.timePeriod,
          category: params.category,
          threshold: params.threshold,
        },
      });
      return response.data.data;
    },
  });
};
