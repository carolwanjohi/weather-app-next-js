"use client";
import React, { useEffect, useState } from "react";

const THEME_KEY = "weather-app-theme";

const ThemeToggle: React.FC = () => {
  // Hydration-safe: don't read localStorage or window on first render
  const [theme, setTheme] = useState<string | null>(null);

  // Set theme from localStorage after mount (client only)
  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) || "theme-floral";
    setTheme(stored);
  }, []);

  // Update localStorage and body class when theme changes
  useEffect(() => {
    if (!theme) return;
    localStorage.setItem(THEME_KEY, theme);
    document.body.classList.remove('theme-floral', 'theme-classic');
    document.body.classList.add(theme);
  }, [theme]);

  // Render nothing until theme is known (prevents hydration mismatch)
  if (!theme) return null;

  return (
    <button
      aria-label="Toggle theme"
      className="ml-2 px-3 py-1 rounded-full shadow glass-card text-2xl border border-floral-lavender bg-floral-solid hover:bg-floral-lavender transition-transform duration-200 active:scale-95 flex items-center justify-center"
      onClick={() => setTheme(theme === 'theme-floral' ? 'theme-classic' : 'theme-floral')}
    >
      {theme === 'theme-floral' ? (
        <span role="img" aria-label="Floral" className="transition-transform duration-200">🌸</span>
      ) : (
        <span role="img" aria-label="Classic" className="transition-transform duration-200">🌤️</span>
      )}
    </button>
  );
};

export default ThemeToggle;
