import { useAuth } from "../../hooks/useAuth";
import { Stats } from "../../types/stats";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  stats: Stats.DashboardSummary;
}

export const DashboardHeader = ({
  title,
  subtitle,
  actions,
  stats,
}: DashboardHeaderProps) => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        <div className="mt-2 text-sm text-muted-foreground">
          Available Picks: {stats.availablePicks} | High Confidence:{" "}
          {stats.highConfidencePicks} | Games: {stats.gamesCount} | Avg Hit
          Rate: {stats.averageHitRate.toFixed(1)}%
        </div>
      </div>
      {actions}
    </div>
  );
};
