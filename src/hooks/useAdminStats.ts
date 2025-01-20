import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import { ApiResponse, AdminStatsResponse, ErrorResponse } from "../types/api";
import { isApiResponse, isAdminStatsResponse } from "../utils/type-guards";

export function useAdminStats() {
  return useQuery<ApiResponse<AdminStatsResponse>, ErrorResponse>({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const response = await api.get<ApiResponse<AdminStatsResponse>>(
        "/admin/stats"
      );
      if (!isApiResponse(response.data, isAdminStatsResponse)) {
        throw new Error("Invalid response format from server");
      }
      return response.data;
    },
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
}
