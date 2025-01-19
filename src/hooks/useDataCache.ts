import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CacheData {
  [key: string]: {
    data: unknown;
    timestamp: number;
  };
}

interface DataCacheState {
  cache: CacheData;
  setCache: (key: string, data: unknown) => void;
  getCache: (key: string) => unknown | null;
  clearCache: () => void;
}

export const useDataCache = create<DataCacheState>()(
  persist(
    (set, get) => ({
      cache: {},
      setCache: (key, data) =>
        set((state) => ({
          cache: {
            ...state.cache,
            [key]: { data, timestamp: Date.now() },
          },
        })),
      getCache: (key) => {
        const cached = get().cache[key];
        if (!cached) return null;
        // Cache expires after 5 minutes
        if (Date.now() - cached.timestamp > 5 * 60 * 1000) return null;
        return cached.data;
      },
      clearCache: () => set({ cache: {} }),
    }),
    {
      name: "data-cache",
    }
  )
);
