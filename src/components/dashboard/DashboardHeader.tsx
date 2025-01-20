import { useAuth } from "../../hooks/useAuth";
import { ThemeToggle } from "../shared/ThemeToggle";
import { LogoutButton } from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { History, Target, TrendingUp, CalendarDays } from "lucide-react";
import { StatsRow } from "../../types/dashboard";
import { calculateDashboardStats } from "../../utils/stats-utils";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  stats: StatsRow[];
}

export const DashboardHeader = ({
  title,
  subtitle,
  actions,
  stats,
}: DashboardHeaderProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { availablePicks, highConfidencePicks, gamesCount } =
    calculateDashboardStats(stats);

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
      </div>
      {actions}
    </div>
  );
};
