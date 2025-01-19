import { useNavigate } from "react-router-dom";
import { ArrowLeft, Activity, TrendingUp } from "lucide-react";
import PicksList from "../components/picks/PicksList";
import ParlayList from "../components/picks/ParlayList";
import { usePicks } from "../hooks/usePicks";
import { calculateCategorySuccess } from "../utils/stats-utils";

export default function MyPicks() {
  const navigate = useNavigate();
  const { singles, parlays, isLoading, deletePick } = usePicks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold">My Picks</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        {/* Primary Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center gap-3">
            <Activity className="text-green-500" size={24} />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Overall Success
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {calculateCategorySuccess(singles, parlays, "POINTS")}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-blue-500" size={24} />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Picks
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {singles.length + parlays.length}
              </p>
            </div>
          </div>
        </div>

        {/* Category Stats */}
        {[
          {
            name: "POINTS",
            icon: (props) => (
              <TrendingUp {...props} className="text-purple-500" />
            ),
          },
          {
            name: "ASSISTS",
            icon: (props) => (
              <Activity {...props} className="text-indigo-500" />
            ),
          },
          {
            name: "REBOUNDS",
            icon: (props) => (
              <TrendingUp {...props} className="text-pink-500" />
            ),
          },
        ].map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow"
          >
            <div className="flex items-center gap-3">
              <Icon size={24} />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {calculateCategorySuccess(singles, parlays, name)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lists */}
      <div className="space-y-8">
        <PicksList picks={singles} onDelete={deletePick} />
        <ParlayList parlays={parlays} onDelete={deletePick} />
      </div>
    </div>
  );
}
