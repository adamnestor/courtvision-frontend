import { UserPickDTO } from "../../types/picks";
import { Trash2, CheckCircle, XCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePick } from "../../services/api";
import { toast } from "react-hot-toast";

interface PicksListProps {
  picks: UserPickDTO[];
}

export default function PicksList({ picks }: PicksListProps) {
  const queryClient = useQueryClient();

  const { mutate: handleDeletePick, isPending } = useMutation({
    mutationFn: deletePick,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["picks"] });
      toast.success("Pick deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete pick");
    },
  });

  return (
    <div className="space-y-2">
      {picks.map((pick) => (
        <div
          key={pick.id}
          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <div className="flex items-center gap-2">
            {pick.result !== undefined &&
              (pick.result ? (
                <CheckCircle className="text-green-500" size={16} />
              ) : (
                <XCircle className="text-red-500" size={16} />
              ))}
            <div>
              <div className="font-medium">{pick.playerName}</div>
              <div className="text-sm text-gray-500">
                {pick.threshold}+ {pick.category.toLowerCase()}{" "}
                {pick.hitRateAtPick}%
              </div>
              <div className="text-xs text-gray-400">
                {pick.team} {pick.opponent}
              </div>
            </div>
          </div>

          {!pick.result && (
            <button
              onClick={() => handleDeletePick(pick.id)}
              disabled={isPending}
              className={`text-gray-400 hover:text-red-500 ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
