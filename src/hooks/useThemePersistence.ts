import { useEffect } from "react";
import { useThemeContext } from "../context/ThemeProvider";

export function useThemePersistence() {
  const { theme } = useThemeContext();

  useEffect(() => {
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#1a1b1e" : "#ffffff"
      );
    }

    // Update document class
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    // Store preference
    localStorage.setItem("theme", theme);
  }, [theme]);
}
