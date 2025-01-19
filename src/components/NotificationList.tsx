import { useNotifications } from "../hooks/useNotifications";
import { X } from "lucide-react";

export const NotificationList = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg flex items-center justify-between gap-2 ${
            notification.type === "error"
              ? "bg-destructive text-destructive-foreground"
              : notification.type === "success"
              ? "bg-success text-success-foreground"
              : "bg-card text-card-foreground"
          }`}
        >
          <p>{notification.message}</p>
          <button
            onClick={() => removeNotification(notification.id)}
            className="text-current hover:opacity-70"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
