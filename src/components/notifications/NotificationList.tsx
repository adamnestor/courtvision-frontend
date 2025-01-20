import { useNotificationStore } from "../../stores/notificationStore";
import { NotificationItem } from "./NotificationItem";
import { AnimatePresence, motion } from "framer-motion";
import { Notification } from "../../types/notifications";

export const NotificationList = () => {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {notifications.map((notification: Notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
          >
            <NotificationItem
              notification={{
                id: notification.id,
                title: notification.title,
                message: notification.message,
                type: notification.type,
                duration: notification.duration,
                timestamp: notification.timestamp,
              }}
              onDismiss={() => removeNotification(notification.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
