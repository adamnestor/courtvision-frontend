import { create } from "zustand";

interface WebSocketState {
  connected: boolean;
  messages: any[];
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: any) => void;
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
