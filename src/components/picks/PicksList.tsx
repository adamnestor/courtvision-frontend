import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { UserPickDTO } from "../../types/picks";

interface PicksListProps {
  picks: UserPickDTO[];
  isToday?: boolean;
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
}

export default function PicksList({
  picks,
  isToday = false,
  onDelete,
  isDeleting = false,
}: PicksListProps) {
  return (
    <div className="space-y-3">
      {picks.length === 0 ? (
        <div className="text-black/60 text-center py-4">No picks available</div>
      ) : (
        picks.map((pick) => (
          <div
            key={pick.id}
            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-4 hover:bg-white/30 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="text-black font-medium">{pick.playerName}</div>
                <div className="text-black/80 text-sm mt-1">
                  {pick.threshold}+ {pick.category.toLowerCase()}
                  <span className="text-cv-success-from ml-1">
                    ({pick.hitRateAtPick}%)
                  </span>
                </div>
                <div className="text-black/50 text-xs mt-1">
                  {pick.team} vs {pick.opponent} •{" "}
                  {format(new Date(pick.createdAt), "h:mm a")}
                </div>
              </div>

              {!isToday && pick.result !== undefined && (
                <div
                  className={
                    pick.result ? "text-cv-success-to" : "text-cv-error-from"
                  }
                >
                  {pick.result ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                </div>
              )}

              {isToday && onDelete && (
                <button
                  onClick={() => onDelete(pick.id)}
                  disabled={isDeleting}
                  className="text-black/40 hover:text-cv-error-from transition-colors disabled:opacity-50"
                  title="Delete pick"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
