import { Parlay } from "../../types/picks";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteParlay } from "../../services/api";
import { toast } from "react-hot-toast";

interface ParlayListProps {
  parlays: Parlay[];
}

export default function ParlayList({ parlays }: ParlayListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { mutate: handleDeleteParlay, isPending } = useMutation({
    mutationFn: deleteParlay,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["picks"] });
      toast.success("Parlay deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete parlay");
    },
  });

  return (
    <div className="space-y-2">
      {parlays.map((parlay) => (
        <div key={parlay.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              {parlay.result !== undefined &&
                (parlay.result ? (
                  <CheckCircle className="text-green-500" size={16} />
                ) : (
                  <XCircle className="text-red-500" size={16} />
                ))}
              <div>
                <div className="font-medium">
                  Parlay #{parlay.id} ({parlay.picks.length} picks)
                </div>
                {parlay.result !== undefined && (
                  <div className="text-sm text-gray-500">
                    {parlay.picks.filter((p) => p.result).length}/
                    {parlay.picks.length} correct
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!parlay.result && (
                <button
                  onClick={() => handleDeleteParlay(parlay.id)}
                  disabled={isPending}
                  className={`text-gray-400 hover:text-red-500 ${
                    isPending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              )}
              <button
                onClick={() =>
                  setExpandedId(expandedId === parlay.id ? null : parlay.id)
                }
                className="text-gray-400 hover:text-gray-600"
              >
                {expandedId === parlay.id ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </div>
          </div>

          {expandedId === parlay.id && (
            <div className="px-3 pb-3 space-y-2">
              {parlay.picks.map((pick) => (
                <div
                  key={pick.id}
                  className="flex items-center gap-2 p-2 bg-white dark:bg-gray-600 rounded"
                >
                  {pick.result !== undefined &&
                    (pick.result ? (
                      <CheckCircle className="text-green-500" size={14} />
                    ) : (
                      <XCircle className="text-red-500" size={14} />
                    ))}
                  <div className="text-sm">
                    <span className="font-medium">{pick.playerName}</span>{" "}
                    {pick.threshold}+ {pick.category.toLowerCase()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
