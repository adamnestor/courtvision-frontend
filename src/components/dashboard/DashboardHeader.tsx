import { useAuth } from "../../hooks/useAuth";
import { ThemeToggle } from "../shared/ThemeToggle";
import { LogoutButton } from "./LogoutButton";
import { useNavigate } from "react-router-dom";
import { History } from "lucide-react";

export const DashboardHeader = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        CourtVision Dashboard
      </h1>
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
