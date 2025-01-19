import { Sun, Moon } from "lucide-react";
import { useThemeContext } from "../../context/ThemeProvider";

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-400 dark:text-gray-200" />
      )}
    </button>
  );
};
