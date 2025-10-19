import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative inline-flex items-center p-2 rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:opacity-90"
            style={{ zIndex: 50 }}
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </button>
    );
}
