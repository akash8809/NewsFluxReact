import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/use-dark-mode";

interface ThemeToggleProps {
  toggleDarkMode?: () => void;
}

export function ThemeToggle({ toggleDarkMode: externalToggle }: ThemeToggleProps) {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const handleToggle = () => {
    if (externalToggle) {
      externalToggle();
    } else {
      toggleDarkMode();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      <SunIcon className="h-5 w-5 dark:hidden" />
      <MoonIcon className="h-5 w-5 hidden dark:block" />
    </Button>
  );
}
