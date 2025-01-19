import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { picksService } from "../services/picksService";
import { toast } from "react-hot-toast";
import { UserPickDTO, Parlay } from "../types/picks";

export function usePicksManager() {
  const queryClient = useQueryClient();

  // Fetch picks and parlays
  const { data: picks = [], isLoading: picksLoading } = useQuery({
    queryKey: ["picks"],
    queryFn: () => picksService.getUserPicks(),
  });

  // Delete mutations
  const deleteSingleMutation = useMutation({
    mutationFn: picksService.deletePick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["picks"] });
      toast.success("Pick deleted successfully");
    },
    onError: () => toast.error("Failed to delete pick"),
  });

  const deleteParlayMutation = useMutation({
    mutationFn: picksService.deleteParlay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["picks"] });
      toast.success("Parlay deleted successfully");
    },
    onError: () => toast.error("Failed to delete parlay"),
  });

  // Calculate success rates
  const calculateSuccess = (category?: string) => {
    const filteredPicks = category
      ? picks.filter((pick) => pick.category === category)
      : picks;

    if (!filteredPicks.length) return 0;

    const successfulPicks = filteredPicks.filter((pick) => pick.result).length;
    return ((successfulPicks / filteredPicks.length) * 100).toFixed(1);
  };

  return {
    picks,
    isLoading: picksLoading,
    deletePick: deleteSingleMutation.mutate,
    deleteParlay: deleteParlayMutation.mutate,
    isDeletingPick: deleteSingleMutation.isPending,
    isDeletingParlay: deleteParlayMutation.isPending,
    calculateSuccess,
  };
}
