import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  systemHealth: {
    apiStatus: "healthy" | "degraded" | "down";
    lastCheck: string;
  };
  performanceMetrics: {
    averageResponseTime: number;
    uptime: number;
  };
}

export function useAdminStats() {
  return useQuery<AdminStats>({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const response = await api.get("/admin/stats");
      return response.data;
    },
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
}
