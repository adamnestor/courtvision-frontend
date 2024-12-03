import React from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5 text-white" />
      )}
    </button>
  );
};
