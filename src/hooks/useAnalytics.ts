import { create } from "zustand";
import { useCallback } from "react";
import { AnalyticsEvent } from "../types/analytics";

interface AnalyticsState {
  events: AnalyticsEvent[];
  trackEvent: (type: string, data: Record<string, unknown>) => void;
  clearEvents: () => void;
  getEventsByType: (type: string) => AnalyticsEvent[];
  lastEvent: AnalyticsEvent | null;
}

export const useAnalytics = create<AnalyticsState>((set, get) => ({
  events: [],
  trackEvent: (type, data) =>
    set((state) => ({
      events: [
        ...state.events,
        {
          name: type,
          properties: data,
          timestamp: new Date().toISOString(),
        },
      ],
    })),
  clearEvents: () => set({ events: [] }),
  getEventsByType: (type) =>
    get().events.filter((event) => event.name === type),
  get lastEvent() {
    const { events } = get();
    return events.length > 0 ? events[events.length - 1] : null;
  },
}));

export const useAnalyticsCallback = () => {
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Implementation of analytics tracking
    console.log("Tracking event:", event);
  }, []);

  const trackError = useCallback(
    (error: Error, context?: Record<string, unknown>) => {
      // Implementation of error tracking
      console.error("Error tracked:", error, context);
    },
    []
  );

  return { trackEvent, trackError };
};
