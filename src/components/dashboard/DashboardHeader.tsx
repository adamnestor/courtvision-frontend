import { useAuth } from "../../hooks/useAuth";
import { LogoutButton } from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { History, CalendarDays, TrendingUp, Target } from "lucide-react";

export const DashboardHeader = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-cv-indigo via-cv-purple to-cv-pink p-8 shadow-lg">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-white/[0.02] bg-grid" />
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cv-purple/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-cv-pink/30 blur-3xl" />

      <div className="relative">
        <div className="flex justify-between items-start">
          {/* Title and Stats */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">
              CourtVision Dashboard
            </h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
              {/* Available Picks */}
              <div className="glass-card rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Target className="text-cv-success-to" size={24} />
                  <div>
                    <p className="text-sm text-white/60">Available Picks</p>
                    <p className="text-2xl font-bold text-white">24</p>
                  </div>
                </div>
              </div>

              {/* High Confidence */}
              <div className="glass-card rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-cv-pink" size={24} />
                  <div>
                    <p className="text-sm text-white/60">80%+ Hit Rate</p>
                    <p className="text-2xl font-bold text-white">8</p>
                  </div>
                </div>
              </div>

              {/* Games Today */}
              <div className="glass-card rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <CalendarDays className="text-yellow-300" size={24} />
                  <div>
                    <p className="text-sm text-white/60">Games Today</p>
                    <p className="text-2xl font-bold text-white">6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/picks")}
              className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <History size={18} />
              My Picks
            </button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};
