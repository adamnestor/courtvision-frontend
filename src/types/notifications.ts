export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  timestamp: number;
  autoClose?: boolean;
  duration?: number;
}

export type NotificationType = Notification["type"];
