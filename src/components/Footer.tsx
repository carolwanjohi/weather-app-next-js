import React from "react";

export default function Footer() {
  return (
    <footer
      className="mt-auto w-full py-6 px-4 text-xs text-center border-t border-blue-100 bg-white/60 backdrop-blur-md shadow-lg glassmorphic rounded-t-2xl flex flex-col md:flex-row items-center justify-between gap-2 font-sans font-medium transition-colors duration-300 text-floral-jacaranda dark:text-floral-sakura"
      aria-label="Site footer"
    >
      <div className="flex-1 flex flex-col md:flex-row items-center gap-2 md:gap-4">
        <span className="font-semibold text-floral-jacaranda dark:text-floral-sakura">&copy; {new Date().getFullYear()} Weatherly</span>
        <span className="hidden md:inline text-floral-lavender dark:text-floral-sakura">|</span>
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-floral-lavender dark:text-floral-sakura hover:text-floral-sakura dark:hover:text-floral-jacaranda font-semibold transition-colors"
        >
          Powered by OpenWeatherMap
        </a>
      </div>
      <div className="flex-1 flex flex-wrap items-center justify-center md:justify-end gap-3">
        <a href="/privacy" className="hover:underline text-floral-lavender dark:text-floral-sakura hover:text-floral-sakura dark:hover:text-floral-jacaranda font-semibold">Privacy</a>
        <a href="/terms" className="hover:underline text-floral-lavender dark:text-floral-sakura hover:text-floral-sakura dark:hover:text-floral-jacaranda font-semibold">Terms</a>
        <a href="https://github.com/carolwanjohi/weather-app-next-js" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-floral-sakura text-floral-lavender dark:text-floral-sakura dark:hover:text-floral-jacaranda font-semibold">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="inline align-text-bottom">
            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.36.31.68.921.68 1.857 0 1.34-.012 2.422-.012 2.753 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
