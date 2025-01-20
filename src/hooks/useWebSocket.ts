import { create } from "zustand";

interface WebSocketMessage {
  type: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

interface WebSocketState {
  connected: boolean;
  messages: WebSocketMessage[];
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: WebSocketMessage) => void;
}

export const useWebSocket = create<WebSocketState>((set) => ({
  connected: false,
  messages: [],
  connect: () => {
    // WebSocket connection logic
    set({ connected: true });
  },
  disconnect: () => {
    // WebSocket disconnection logic
    set({ connected: false });
  },
  sendMessage: (message) => {
    // WebSocket send message logic
    set((state) => ({ messages: [...state.messages, message] }));
  },
}));
