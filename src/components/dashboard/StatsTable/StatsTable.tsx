import { StatsTableRow } from "./StatsTableRow";
import { StatsTableHeader } from "./StatsTableHeader";
import { LoadingState } from "../../common/LoadingState";
import { useStatsTable } from "../../../hooks/useStatsTable";

interface StatsTableProps {
  stats: StatsRow[];
  isLoading: boolean;
}

export const StatsTable = ({ stats, isLoading }: StatsTableProps) => {
  if (isLoading) {
    return <LoadingState message="Loading stats..." />;
  }

  if (!stats.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No stats available
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow overflow-hidden">
      <StatsTableHeader />
      <div className="divide-y divide-border">
        {stats.map((stat) => (
          <StatsTableRow key={stat.playerId} stat={stat} />
        ))}
      </div>
    </div>
  );
};
