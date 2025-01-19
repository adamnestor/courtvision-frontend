import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserPreferences {
  defaultTimePeriod: string;
  defaultCategory: string;
  showHitRateChart: boolean;
  compactView: boolean;
  setDefaultTimePeriod: (period: string) => void;
  setDefaultCategory: (category: string) => void;
  toggleHitRateChart: () => void;
  toggleCompactView: () => void;
}

export const useUserPreferences = create<UserPreferences>()(
  persist(
    (set) => ({
      defaultTimePeriod: "L10",
      defaultCategory: "ALL",
      showHitRateChart: true,
      compactView: false,
      setDefaultTimePeriod: (period) => set({ defaultTimePeriod: period }),
      setDefaultCategory: (category) => set({ defaultCategory: category }),
      toggleHitRateChart: () =>
        set((state) => ({ showHitRateChart: !state.showHitRateChart })),
      toggleCompactView: () =>
        set((state) => ({ compactView: !state.compactView })),
    }),
    {
      name: "user-preferences",
    }
  )
);
