"use client";
import React, { useState, useEffect } from "react";
import IOSHeader from "../components/IOSHeader";
import WeatherDisplay from "../components/WeatherDisplay";
import Forecast from "../components/Forecast";
import Footer from "../components/Footer";
import type { Forecast as ForecastType } from "../types/forecast";

interface City {
  id: number;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [forecast, setForecast] = useState<ForecastType | null>(null);
  const [searchActive, setSearchActive] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);

  useEffect(() => {
    fetch('/cities.json')
      .then(res => res.json())
      .then((data: City[]) => {
        setCities(data);
      });
  }, []);

  const handleSearch = () => {
    setSearchActive(true);
  };

  const closeSearch = () => {
    setSearchActive(false);
  };

  const handleSelect = (cityName: string) => {
    const idx = cities.findIndex(c => `${c.city}, ${c.country}` === cityName);
    if (idx !== -1) {
      // Move selected city to the front of the array
      const newCities = [cities[idx], ...cities.slice(0, idx), ...cities.slice(idx + 1)];
      setCities(newCities);
      setNoResults(false);
    } else {
      // City not found: show iOS-inspired no results UI
      setNoResults(true);
      setTimeout(() => setNoResults(false), 2000); // Hide after 2s
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-floral">
      <IOSHeader
        onSearch={handleSearch}
        onSelect={(cityName) => {
          setWeatherLoading(true); // Start loading state
          setForecast(null); // Clear forecast to trigger skeleton
          handleSelect(cityName);
        }}
        searchActive={searchActive}
        closeSearch={closeSearch}
      />
      <main className="flex flex-col gap-8 items-center w-full max-w-2xl mx-auto px-2 py-8 lg:max-w-6xl">
        {noResults && (
          <div className="w-full flex justify-center mb-4">
            <div className="px-6 py-3 rounded-2xl bg-white/80 border border-blue-200 shadow text-blue-700 font-semibold text-base text-center animate-fade-in-out">
              <span role="img" aria-label="Not found" className="mr-2">🔍</span>
              No city found. Please try another search.
            </div>
          </div>
        )}
        {/* Only show the selected city (first in array) */}
        {cities.length > 0 && (
          <section key={cities[0].id} className="glass-card w-full flex flex-col items-center p-8 mb-4 bg-floral-solid">
            <WeatherDisplay
              city={`${cities[0].city}, ${cities[0].country}`}
              onWeatherLoaded={(w, f) => {
                setForecast(f);
                setWeatherLoading(false); // End loading state
              }}
            />
            <div className="w-full mt-4">
              <Forecast forecast={weatherLoading ? null : forecast} mode="hourly" />
            </div>
            <div className="w-full mt-4">
              <Forecast forecast={weatherLoading ? null : forecast} mode="daily" />
            </div>
          </section>
        )}
        {/* Weather Details for selected city */}
        {/* Removed duplicate WeatherDetails to keep chips only inside WeatherDisplay glass card */}
      </main>
      <Footer />
    </div>
  );
}
