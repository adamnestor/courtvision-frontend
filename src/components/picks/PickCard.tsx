import { PickResponse } from "../../types/api";

interface PickCardProps {
  pick: PickResponse;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export const PickCard = ({ pick, onDelete, isDeleting }: PickCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow p-4">
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
        <p className="text-sm">
          {pick.category} {pick.threshold} ({pick.hitRateAtPick}%)
        </p>
        {pick.result && (
          <span
            className={`text-sm ${
              pick.result === "WIN" ? "text-success" : "text-destructive"
            }`}
          >
            {pick.result}
          </span>
        )}
      </div>
      <div className="mt-2">
        {pick.result === null && (
          <span className="text-yellow-500">Pending</span>
        )}
        {pick.result === true && <span className="text-success">Hit</span>}
        {pick.result === false && (
          <span className="text-destructive">Miss</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        {new Date(pick.gameTime).toLocaleDateString()}
      </p>
    </div>
  );
};
