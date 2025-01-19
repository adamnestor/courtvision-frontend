import { create } from "zustand";

interface AnalyticsEvent {
  type: string;
  data: Record<string, any>;
  timestamp: number;
}

interface AnalyticsState {
  events: AnalyticsEvent[];
  trackEvent: (type: string, data: Record<string, any>) => void;
  clearEvents: () => void;
  getEventsByType: (type: string) => AnalyticsEvent[];
  lastEvent: AnalyticsEvent | null;
}

export const useAnalytics = create<AnalyticsState>((set, get) => ({
  events: [],
  trackEvent: (type, data) =>
    set((state) => ({
      events: [...state.events, { type, data, timestamp: Date.now() }],
    })),
  clearEvents: () => set({ events: [] }),
  getEventsByType: (type) =>
    get().events.filter((event) => event.type === type),
  get lastEvent() {
    const { events } = get();
    return events.length > 0 ? events[events.length - 1] : null;
  },
}));
