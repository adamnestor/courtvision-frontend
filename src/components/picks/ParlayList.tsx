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
import { format } from "date-fns";

interface ParlayListProps {
  parlays: Parlay[];
  isToday?: boolean;
}

export default function ParlayList({
  parlays,
  isToday = false,
}: ParlayListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
        <div key={parlay.id} className="bg-white dark:bg-gray-800 rounded-lg">
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!isToday &&
                  parlay.result !== undefined &&
                  (parlay.result ? (
                    <CheckCircle className="text-green-500" size={16} />
                  ) : (
                    <XCircle className="text-red-500" size={16} />
                  ))}
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    Parlay #{parlay.id} ({parlay.picks.length} picks)
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(parlay.createdAt), "h:mm a")}
                    {!isToday && parlay.result !== undefined && (
                      <span className="ml-1">
                        • {parlay.picks.filter((p) => p.result).length}/
                        {parlay.picks.length} correct
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isToday && ( // Only show delete button for today's parlays
                  <button
                    onClick={() => handleDeleteParlay(parlay.id)}
                    disabled={isPending}
                    className={`text-gray-400 hover:text-red-500 ${
                      isPending ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    title="Delete parlay"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button
                  onClick={() =>
                    setExpandedId(expandedId === parlay.id ? null : parlay.id)
                  }
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  title={expandedId === parlay.id ? "Collapse" : "Expand"}
                >
                  {expandedId === parlay.id ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {expandedId === parlay.id && (
            <div className="px-3 pb-3 border-t border-gray-100 dark:border-gray-700">
              <div className="space-y-2 pt-2">
                {parlay.picks.map((pick) => (
                  <div
                    key={pick.id}
                    className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    {!isToday &&
                      pick.result !== undefined &&
                      (pick.result ? (
                        <CheckCircle className="text-green-500" size={14} />
                      ) : (
                        <XCircle className="text-red-500" size={14} />
                      ))}
                    <div className="text-sm">
                      <span className="font-medium">{pick.playerName}</span>{" "}
                      {pick.threshold}+ {pick.category.toLowerCase()} (
                      {pick.hitRateAtPick}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
