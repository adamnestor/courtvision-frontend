import { useEffect, useRef } from "react";
import { useAuth } from "../context/auth-context";

export function useSessionTimeout(timeoutInMinutes = 30) {
  const { logout } = useAuth();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(logout, timeoutInMinutes * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keypress", resetTimeout);

    resetTimeout();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keypress", resetTimeout);
    };
  }, [logout, timeoutInMinutes]);
}
