import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { PickResponse } from "../../types/picks";
import { InfoCircle, Tooltip } from "../icons";
import { Trash2 } from "lucide-react";

interface PickCardProps {
  pick: PickResponse & {
    hitRate: number;
    gameTime: string;
    category: string;
    threshold: number;
  };
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
  className?: string;
}

export const PickCard = ({
  pick,
  onDelete,
  isDeleting = false,
  className,
}: PickCardProps) => {
  const { hitRate, confidenceScore } = pick;

  const formattedDate = format(new Date(pick.gameTime), "MMM d, yyyy");

  return (
    <div className={`bg-card rounded-lg shadow p-4 ${className || ""}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{pick.playerName}</h3>
          <p className="text-sm text-muted-foreground">
            {pick.team} vs {pick.opponent}
          </p>
          <p className="text-sm">
            {pick.category} {pick.threshold}+
          </p>
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        </div>
        <div className="flex flex-col items-end">
          {pick.result && (
            <span
              className={`text-sm ${
                pick.result === "WIN" ? "text-success" : "text-error"
              }`}
            >
              {pick.result}
            </span>
          )}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Hit Rate:</span>
            <span className="text-sm">{hitRate.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Confidence:</span>
            <span
              className={cn(
                "text-sm",
                confidenceScore >= 80 && "text-success font-medium",
                confidenceScore >= 60 && confidenceScore < 80 && "text-warning",
                confidenceScore < 60 && "text-muted-foreground"
              )}
            >
              {confidenceScore}
            </span>
            <Tooltip content="Confidence score based on recent performance, matchup, and historical data">
              <InfoCircle className="w-4 h-4 text-muted-foreground" />
            </Tooltip>
          </div>
          {onDelete && (
            <button
              onClick={() => onDelete(pick.id.toString())}
              disabled={isDeleting}
              className="text-error hover:text-error/80 disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : <Trash2 size={16} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
