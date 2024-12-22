import { useAuth } from "../../hooks/useAuth";
import { ThemeToggle } from "../shared/ThemeToggle";
import { LogoutButton } from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { History, Target, TrendingUp, CalendarDays } from "lucide-react";

export const DashboardHeader = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between items-center">
      {/* Title and Stats */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-black">CourtVision Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Available Picks */}
          <div className="glass-card rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Target className="text-cv-success-to" size={24} />
              <div>
                <p className="text-sm text-black/60">Available Picks</p>
                <p className="text-2xl font-bold text-black">24</p>
              </div>
            </div>
          </div>

          {/* High Confidence */}
          <div className="glass-card rounded-lg p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-cv-black" size={24} />
              <div>
                <p className="text-sm text-black/60">80%+ Hit Rate</p>
                <p className="text-2xl font-bold text-black">8</p>
              </div>
            </div>
          </div>

          {/* Games Today */}
          <div className="glass-card rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-black" size={24} />
              <div>
                <p className="text-sm text-black/60">Games Today</p>
                <p className="text-2xl font-bold text-black">6</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Actions*/}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/picks")}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <History size={18} />
          My Picks
        </button>
        <ThemeToggle />
        <LogoutButton />
      </div>
    </div>
  );
};
