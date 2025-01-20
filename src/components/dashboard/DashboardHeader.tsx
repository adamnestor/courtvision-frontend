import { useAuth } from "../../context/auth-context";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  stats: {
    availablePicks: number;
    highConfidencePicks: number;
    gamesCount: number;
    averageHitRate: number;
  };
  actions?: React.ReactNode;
}

export const DashboardHeader = ({
  title,
  subtitle,
  stats,
  actions,
}: DashboardHeaderProps) => {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && (
            <p data-testid="subtitle" className="text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <StatCard
          label="Available Picks"
          value={stats.availablePicks.toString()}
        />
        <StatCard
          label="High Confidence"
          value={stats.highConfidencePicks.toString()}
        />
        <StatCard label="Games" value={stats.gamesCount.toString()} />
        <StatCard label="Average Hit Rate" value={`${stats.averageHitRate}%`} />
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-card p-4 rounded-lg">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </div>
);
