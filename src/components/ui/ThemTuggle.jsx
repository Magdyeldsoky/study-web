import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isdarkmod, setIsdarkmod] = useState(false);

  useEffect(() => {
    const stor = localStorage.getItem("theme");
    if (stor === "dark") {
      setIsdarkmod(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsdarkmod(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    if (isdarkmod) {
      setIsdarkmod(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsdarkmod(true);
    }
  };

  return (
    <button
      onClick={toggle}
      className="max-sm:hidden rounded-full transition-all duration-300 focus:outline-none"
      aria-label="Toggle Theme"
    >
      {isdarkmod ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="w-6 h-6 text-blue-900 dark:text-blue-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
