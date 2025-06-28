// src/components/IOSHeader.tsx
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import CityAutocomplete from './CityAutocomplete';
import ThemeToggle from './ThemeToggle';

interface IOSHeaderProps {
  onSearch: () => void;
  onSelect: (city: string) => void;
  searchActive: boolean;
  closeSearch: () => void;
}

const IOSHeader: React.FC<IOSHeaderProps> = ({ onSearch, onSelect, searchActive, closeSearch }) => (
  <header className="relative flex items-center justify-between px-4 py-3 glass-card bg-white/70 shadow-md z-50 h-20 overflow-visible border border-[var(--lavender)]">
    <div className="relative flex-1 h-full flex items-center z-50">
      {/* Animated Title */}
      <span
        className={`absolute left-0 right-0 top-0 bottom-0 flex items-center justify-start w-full transition-all duration-300 ease-in-out
          ${searchActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{letterSpacing: '0.04em'}}
      >
        <span className="text-3xl font-semibold bg-gradient-to-r from-[var(--sakura)] via-[var(--jacaranda)] to-[var(--lavender)] bg-clip-text text-transparent tracking-wide drop-shadow-sm select-none flex items-center h-full">
          Weatherly
        </span>
      </span>
      {/* Animated Search */}
      <div
        className={`absolute left-0 right-0 top-0 bottom-0 flex items-center w-full transition-all duration-300 ease-in-out z-50
          ${searchActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex-1 flex items-center h-full">
          <CityAutocomplete onSelect={(city) => { onSelect(city); closeSearch(); }} />
        </div>
        <button onClick={closeSearch} className="ml-2 p-2 flex items-center justify-center rounded-full bg-white/80 border border-[var(--lavender)] shadow hover:bg-[var(--sakura)]/40 text-[var(--jacaranda)] hover:text-[var(--lavender)] text-xl focus:outline-none focus:ring-2 focus:ring-[var(--lavender)] h-10 w-10" aria-label="Close search">
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
    {!searchActive && (
      <div className="flex items-center gap-4 h-full">
        <button onClick={onSearch} aria-label="Search" className="p-2 rounded-full hover:bg-[var(--sakura)]/40 transition">
          <FiSearch className="text-2xl text-[var(--lavender)]" />
        </button>
        <ThemeToggle />
      </div>
    )}
  </header>
);

export default IOSHeader;
