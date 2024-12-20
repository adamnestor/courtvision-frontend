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

  const formatParlayLabel = (parlay: Parlay) => {
    return `${parlay.picks.length}-Pick Parlay`;
  };

  return (
    <div className="space-y-2">
      {parlays.length === 0 ? (
        <div className="text-white/60 text-center py-4">
          No parlays available
        </div>
      ) : (
        parlays.map((parlay) => (
          <div
            key={parlay.id}
            className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
          >
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {!isToday &&
                    parlay.result !== undefined &&
                    (parlay.result ? (
                      <CheckCircle className="text-cv-success-to" size={16} />
                    ) : (
                      <XCircle className="text-cv-error-from" size={16} />
                    ))}
                  <div>
                    <div className="font-medium text-white">
                      {formatParlayLabel(parlay)}
                    </div>
                    <div className="text-sm text-white/60">
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
                  {isToday && onDelete && (
                    <button
                      onClick={() => onDelete(parlay.id)}
                      disabled={isDeleting}
                      className="text-white/40 hover:text-cv-error-from transition-colors disabled:opacity-50"
                      title="Delete parlay"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === parlay.id ? null : parlay.id)
                    }
                    className="text-white/40 hover:text-white transition-colors"
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
              <div className="px-3 pb-3 border-t border-white/10">
                <div className="space-y-2 pt-2">
                  {parlay.picks.map((pick) => (
                    <div
                      key={pick.id}
                      className="flex items-center gap-2 p-2 bg-white/5 rounded-lg"
                    >
                      {!isToday &&
                        pick.result !== undefined &&
                        (pick.result ? (
                          <CheckCircle
                            className="text-cv-success-to"
                            size={14}
                          />
                        ) : (
                          <XCircle className="text-cv-error-from" size={14} />
                        ))}
                      <div className="text-sm text-white">
                        <span className="font-medium">{pick.playerName}</span>{" "}
                        {pick.threshold}+ {pick.category.toLowerCase()} (
                        {pick.hitRateAtPick}%)
                        <div className="text-xs text-white/40">
                          {pick.team} vs {pick.opponent}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
