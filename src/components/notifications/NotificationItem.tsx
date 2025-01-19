import { Bell, X } from "lucide-react";
import { Notification } from "../../types/notifications";

interface NotificationItemProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

export const NotificationItem = ({
  notification,
  onDismiss,
}: NotificationItemProps) => {
  return (
    <div className="flex items-start gap-3 bg-card p-4 rounded-lg shadow-sm">
      <Bell className="text-primary mt-1" size={16} />
      <div className="flex-1">
        <p className="font-medium">{notification.title}</p>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {new Date(notification.timestamp).toLocaleTimeString()}
        </p>
      </div>
      <button
        onClick={() => onDismiss(notification.id)}
        className="text-muted-foreground hover:text-foreground"
      >
        <X size={16} />
      </button>
    </div>
  );
};
