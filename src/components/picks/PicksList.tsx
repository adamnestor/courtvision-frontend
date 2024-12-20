import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { UserPickDTO } from "../../types/picks";

interface PicksListProps {
  picks: UserPickDTO[];
  isToday?: boolean;
  onDelete?: (id: number) => void;
  isDeleting?: boolean;
}

export default function PicksList({ picks, isToday = false }: PicksListProps) {
  return (
    <div className="space-y-3">
      {picks.map((pick) => (
        <div
          key={pick.id}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/15 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="text-white font-medium">
                {pick.playerName}
              </div>
              <div className="text-white/60 text-sm">
                {pick.threshold}+ {pick.category.toLowerCase()} ({pick.hitRateAtPick}%)
              </div>
              <div className="text-white/40 text-xs">
                {pick.team} vs {pick.opponent} • {format(new Date(pick.createdAt), 'h:mm a')}
              </div>
            </div>
            {!isToday && pick.result !== undefined && (
              <div className={pick.result ? "text-cv-success-to" : "text-cv-error-from"}>
                {pick.result ? <CheckCircle size={16} /> : <XCircle size={16} />}
              </div>
            )}
            {isToday && (
              <button
                className="text-white/40 hover:text-cv-error-from transition-colors"
                title="Delete pick"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}