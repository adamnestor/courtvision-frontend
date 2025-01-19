import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppSettings {
  refreshInterval: number;
  autoRefresh: boolean;
  notifications: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
  performance: {
    reducedMotion: boolean;
    lowBandwidth: boolean;
  };
  setRefreshInterval: (interval: number) => void;
  toggleAutoRefresh: () => void;
  toggleNotifications: (type: keyof AppSettings["notifications"]) => void;
  togglePerformance: (type: keyof AppSettings["performance"]) => void;
}

export const useAppSettings = create<AppSettings>()(
  persist(
    (set) => ({
      refreshInterval: 30000,
      autoRefresh: true,
      notifications: {
        enabled: true,
        sound: true,
        desktop: false,
      },
      performance: {
        reducedMotion: false,
        lowBandwidth: false,
      },
      setRefreshInterval: (interval) => set({ refreshInterval: interval }),
      toggleAutoRefresh: () =>
        set((state) => ({ autoRefresh: !state.autoRefresh })),
      toggleNotifications: (type) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [type]: !state.notifications[type],
          },
        })),
      togglePerformance: (type) =>
        set((state) => ({
          performance: {
            ...state.performance,
            [type]: !state.performance[type],
          },
        })),
    }),
    {
      name: "app-settings",
    }
  )
);
