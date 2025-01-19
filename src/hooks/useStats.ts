import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useStats(userId: string) {
  return useQuery({
    queryKey: ["stats", userId],
    queryFn: () => api.get(`/stats/${userId}`).then((res) => res.data),
    enabled: !!userId,
  });
}
