import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createSinglePick } from "../services/api";
import { toast } from "react-hot-toast";
import { PickCategory } from "../types/parlay";
import { usePlayerStats } from "./usePlayerStats";

export function usePlayerDetails(
  playerId: number,
  timePeriod: string,
  category: string,
  threshold: number
) {
  const queryClient = useQueryClient();
  const { data: stats, isLoading } = usePlayerStats(
    playerId,
    timePeriod,
    category,
    threshold
  );

  const createPickMutation = useMutation({
    mutationFn: (pickData: {
      category: PickCategory;
      threshold: number;
      hitRateAtPick: number;
    }) =>
      createSinglePick({
        playerId,
        ...pickData,
        isParlay: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["picks"] });
      toast.success("Pick saved successfully!");
    },
    onError: () => {
      toast.error("Failed to save pick");
    },
  });

  return {
    stats,
    isLoading,
    createPick: createPickMutation.mutate,
    isCreating: createPickMutation.isPending,
  };
}
