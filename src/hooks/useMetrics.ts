import { create } from "zustand";

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
}

interface MetricsState {
  metrics: PerformanceMetric[];
  addMetric: (name: string, value: number) => void;
  clearMetrics: () => void;
  getMetricsByName: (name: string) => PerformanceMetric[];
  getAverageMetric: (name: string) => number;
}

export const useMetrics = create<MetricsState>((set, get) => ({
  metrics: [],
  addMetric: (name, value) =>
    set((state) => ({
      metrics: [...state.metrics, { name, value, timestamp: Date.now() }],
    })),
  clearMetrics: () => set({ metrics: [] }),
  getMetricsByName: (name) =>
    get().metrics.filter((metric) => metric.name === name),
  getAverageMetric: (name) => {
    const metrics = get().getMetricsByName(name);
    if (metrics.length === 0) return 0;
    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  },
}));
