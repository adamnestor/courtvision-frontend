import { create } from "zustand";

interface RealtimeState {
  connected: boolean;
  lastUpdate: Date | null;
  updates: {
    [key: string]: {
      data: Record<string, unknown>;
      timestamp: number;
    };
  };
  setConnected: (status: boolean) => void;
  addUpdate: (key: string, data: Record<string, unknown>) => void;
  clearUpdates: () => void;
}

export const useRealtimeStore = create<RealtimeState>((set) => ({
  connected: false,
  lastUpdate: null,
  updates: {},
  setConnected: (status) => set({ connected: status }),
  addUpdate: (key, data) =>
    set((state) => ({
      updates: {
        ...state.updates,
        [key]: { data, timestamp: Date.now() },
      },
      lastUpdate: new Date(),
    })),
  clearUpdates: () => set({ updates: {} }),
}));
