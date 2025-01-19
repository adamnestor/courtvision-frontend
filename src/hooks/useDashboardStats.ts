import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { Category, TimePeriod, Threshold, StatsRow } from "../types/dashboard";

interface DashboardParams {
  timePeriod: TimePeriod;
  category: Category;
  threshold: Threshold | null;
}

export function useDashboardStats({
  timePeriod,
  category,
  threshold,
}: DashboardParams) {
  return useQuery<StatsRow[]>({
    queryKey: ["dashboardStats", timePeriod, category, threshold],
    queryFn: async () => {
      const response = await api.get("/dashboard/stats", {
        params: { timePeriod, category, threshold },
      });
      return response.data.data;
    },
  });
}
