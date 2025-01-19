import { useNotifications } from "../../hooks/useNotifications";
import { NotificationContainer } from "./NotificationContainer";
import { NotificationItem } from "./NotificationItem";
import { AnimatePresence, motion } from "framer-motion";

export const NotificationList = () => {
  const { notifications, dismissNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <NotificationContainer>
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.2 }}
          >
            <NotificationItem
              notification={notification}
              onDismiss={dismissNotification}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </NotificationContainer>
  );
};
