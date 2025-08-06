import React, { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <button
      onClick={toggleTheme}
      className="ml-4 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white px-3 py-1.5 text-sm rounded-full hover:bg-slate-300 dark:hover:bg-slate-600"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
};
