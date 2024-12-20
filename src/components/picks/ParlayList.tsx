import {
  ChevronDown,
  ChevronUp,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Parlay } from "../../types/picks";

interface ParlayListProps {
  parlays: Parlay[];
  isToday?: boolean;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export default function ParlayList({
  parlays,
  isToday = false,
  onDelete,
  isDeleting = false,
}: ParlayListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {parlays.length === 0 ? (
        <div className="text-black/60 text-center py-4">
          No parlays available
        </div>
      ) : (
        parlays.map((parlay) => (
          <div
            key={parlay.id}
            className="bg-black/20 backdrop-blur-md border border-black/30 rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-black/20 backdrop-blur-md rounded-lg px-3 py-1">
                    <span className="text-black font-medium">
                      {parlay.picks.length}
                    </span>
                    <span className="text-black/60 text-sm ml-1">picks</span>
                  </div>
                  <div>
                    {!isToday && parlay.result !== undefined && (
                      <div className="flex items-center gap-1.5">
                        {parlay.result ? (
                          <CheckCircle className="text-cv-success-to h-4 w-4" />
                        ) : (
                          <XCircle className="text-cv-error-from h-4 w-4" />
                        )}
                        <span className="text-black/80 text-sm">
                          {parlay.picks.filter((p) => p.result).length}/
                          {parlay.picks.length} correct
                        </span>
                      </div>
                    )}
                    <div className="text-black/50 text-sm">
                      {format(new Date(parlay.createdAt), "h:mm a")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isToday && onDelete && (
                    <button
                      onClick={() => onDelete(parlay.id)}
                      disabled={isDeleting}
                      className="text-black/40 hover:text-cv-error-from transition-colors disabled:opacity-50"
                      title="Delete parlay"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === parlay.id ? null : parlay.id)
                    }
                    className="text-black/40 hover:text-black transition-colors"
                  >
                    {expandedId === parlay.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {expandedId === parlay.id && (
              <div className="px-4 pb-4 space-y-2">
                {parlay.picks.map((pick) => (
                  <div
                    key={pick.id}
                    className="bg-black/30 backdrop-blur-md rounded-lg p-3 flex items-center gap-3"
                  >
                    {!isToday && pick.result !== undefined && (
                      <div>
                        {pick.result ? (
                          <CheckCircle className="text-cv-success-to h-4 w-4" />
                        ) : (
                          <XCircle className="text-cv-error-from h-4 w-4" />
                        )}
                      </div>
                    )}
                    <div>
                      <div className="text-black font-medium">
                        {pick.playerName}
                      </div>
                      <div className="text-black/80 text-sm">
                        {pick.threshold}+ {pick.category.toLowerCase()}
                        <span className="text-cv-success-from ml-1">
                          ({pick.hitRateAtPick}%)
                        </span>
                      </div>
                      <div className="text-black/50 text-xs">
                        {pick.team} vs {pick.opponent}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
