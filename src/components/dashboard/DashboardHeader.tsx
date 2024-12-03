import { useAuth } from "../../hooks/useAuth";
import { ThemeToggle } from "../shared/ThemeToggle";
import { LogoutButton } from "./LogoutButton";

export const DashboardHeader = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        CourtVision Dashboard
      </h1>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </div>
  );
};
