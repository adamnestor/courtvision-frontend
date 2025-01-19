import { ReactNode } from "react";

interface NotificationContainerProps {
  children: ReactNode;
}

export const NotificationContainer = ({
  children,
}: NotificationContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 w-80 space-y-2">{children}</div>
  );
};
