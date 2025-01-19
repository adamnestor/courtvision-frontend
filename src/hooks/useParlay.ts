import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createParlay } from "../services/api";
import { toast } from "react-hot-toast";
import { ParlayPick } from "../types/parlay";
import { useParlayBuilder } from "../context/ParlayBuilderContext";

export function useParlay() {
  const queryClient = useQueryClient();
  const { clearPicks, togglePanel } = useParlayBuilder();

  const parlayMutation = useMutation({
    mutationFn: async (picks: ParlayPick[]) => {
      const pickRequests = picks.map((pick) => ({
        playerId: pick.playerId,
        category: pick.category,
        threshold: pick.threshold,
        hitRateAtPick: pick.hitRate,
        isParlay: true,
      }));
      return createParlay(pickRequests);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["picks"] });
      toast.success("Parlay saved successfully!");
      clearPicks();
      togglePanel();
    },
    onError: () => {
      toast.error("Failed to save parlay");
    },
  });

  return {
    createParlay: parlayMutation.mutate,
    isCreating: parlayMutation.isPending,
  };
}
