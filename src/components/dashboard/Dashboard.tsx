import { useAuth } from "../../hooks/useAuth";
import { DashboardHeader } from "./DashboardHeader";
import { FilterBar } from "./FilterBar";
import { StatsTable } from "./StatsTable";

export const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader />
        <main className="mt-8 space-y-6">
          <FilterBar />
          <StatsTable />
        </main>
      </div>
    </div>
  );
};
