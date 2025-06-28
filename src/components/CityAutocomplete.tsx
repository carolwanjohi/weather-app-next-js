// src/components/CityAutocomplete.tsx
import React, { useState } from 'react';
import { fetchCities } from '../services/weatherService';

interface CityAutocompleteProps {
  onSelect: (city: string) => void;
}

const CityAutocomplete: React.FC<CityAutocompleteProps> = ({ onSelect }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchCitiesForAutocomplete = async (query: string) => {
    if (!query) return setSuggestions([]);
    // Pass query to fetchCities
    const cities = await fetchCities(query);
    setSuggestions(cities.slice(0, 5).map((city) => `${city.city}, ${city.country}`));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setShowDropdown(true);
    if (value === "") {
      // Show all available cities if input is empty
      fetch('/cities.json')
        .then(res => res.json())
        .then((cities) => {
          setSuggestions(cities.map((city: any) => `${city.city}, ${city.country}`));
        });
    } else {
      fetchCitiesForAutocomplete(value);
    }
  };

  const handleSelect = (city: string) => {
    setInput(""); // Clear input after selection
    setShowDropdown(false);
    setSuggestions([]);
    onSelect(city);
  };

  const handleFocus = async () => {
    // Show all available cities on focus if input is empty
    if (!input) {
      fetch('/cities.json')
        .then(res => res.json())
        .then((cities) => {
          setSuggestions(cities.map((city: any) => `${city.city}, ${city.country}`));
        });
    }
    setShowDropdown(true);
  };

  return (
    <div className="relative w-full max-w-xs mx-auto mb-4">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search city..."
        className="w-full px-3 py-2 rounded-lg border border-floral-lavender focus:outline-none focus:ring-2 focus:ring-floral-jacaranda text-floral-jacaranda bg-floral/80 backdrop-blur-md shadow-sm transition-colors placeholder:text-floral-lavender"
        aria-label="Search city"
        onFocus={handleFocus}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
      />
      {showDropdown && (
        <ul className="absolute left-0 right-0 bg-floral-solid text-floral-jacaranda rounded-2xl shadow-2xl z-20 mt-2 max-h-60 overflow-auto border border-floral-lavender backdrop-blur-lg transition-all duration-200 ring-1 ring-floral-lavender group">
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((city) => (
                <li
                  key={city}
                  className="px-4 py-3 cursor-pointer transition-colors border-b border-floral-lavender last:border-b-0 text-lg font-medium rounded-xl flex items-center gap-2 text-floral-jacaranda floral-ios-hover"
                  onMouseDown={() => handleSelect(city)}
                  tabIndex={0}
                  aria-label={`Select ${city}`}
                >
                  <span className="w-2 h-2 bg-floral-sakura rounded-full inline-block mr-2"></span>
                  {city}
                </li>
              ))}
              {suggestions.length === 5 && (
                <li className="px-4 py-2 text-floral-lavender text-center select-none text-base font-semibold rounded-xl bg-transparent border-0 mt-1 cursor-default tracking-wide opacity-70 italic" aria-hidden="true">
                  More cities available…
                </li>
              )}
            </>
          ) : (
            <li className="px-4 py-3 text-floral-sakura text-center select-none text-lg font-medium rounded-xl">
              <span role="img" aria-label="Not found" className="mr-2">🔍</span>
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CityAutocomplete;
