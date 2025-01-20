import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UpdateData {
  type: string;
  data: Record<string, unknown>;
  timestamp: string;
}

export const useRealtimeUpdates = (
  endpoint: string,
  onUpdate: (data: UpdateData) => void
) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket: Socket = io(endpoint);

    socket.on("update", onUpdate);

    return () => {
      socket.off("update", onUpdate);
      socket.disconnect();
    };
  }, [endpoint, onUpdate]);

  return { connected };
};
