import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { PickResponse } from "../../types/picks";
import { InfoCircle, Tooltip } from "../icons";

interface PickCardProps {
  pick: PickResponse & {
    hitRate: number;
    gameTime: string;
  };
  onDelete: (id: number) => void;
  isDeleting: boolean;
  className?: string;
}

export const PickCard = ({
  pick,
  onDelete,
  isDeleting,
  className,
}: PickCardProps) => {
  const { hitRate, confidenceScore } = pick;

  const isWin = pick.result === "WIN";
  const isLoss = pick.result === "LOSS";

  return (
    <div className={`bg-card rounded-lg shadow p-4 ${className || ""}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{pick.playerName}</h3>
          <p className="text-sm text-muted-foreground">
            {pick.team} vs {pick.opponent}
          </p>
        </div>
        <button
          disabled={isDeleting}
          onClick={() => onDelete(pick.id)}
          className="text-destructive hover:text-destructive/80"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between mb-2">
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
        </div>
      </div>
      <div className="mt-2">
        {pick.result === null && (
          <span className="text-yellow-500">Pending</span>
        )}
        {isWin && <span className="text-success">Hit</span>}
        {isLoss && <span className="text-destructive">Miss</span>}
      </div>
      <p className="text-sm text-muted-foreground">
        {format(new Date(pick.gameTime), "MMM d, yyyy")}
      </p>
    </div>
  );
};
