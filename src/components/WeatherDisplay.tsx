// src/components/WeatherDisplay.tsx
import React, { useEffect, useState } from 'react';
import { fetchWeatherAndForecastByCity } from '../services/weatherService';
import type { Weather } from '../types/weather';
import type { Forecast as ForecastType } from '../types/forecast';
import WeatherDetails from './WeatherDetails';
import Image from 'next/image';

interface WeatherDisplayProps {
  city?: string;
  onWeatherLoaded?: (weather: Weather | null, forecast: ForecastType | null) => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, onWeatherLoaded }) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [forecast, setForecast] = useState<ForecastType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setForecast(null); // Clear forecast immediately on city change for skeleton
    if (city) {
      fetchWeatherAndForecastByCity(city)
        .then(({ weather, forecast }) => {
          setWeather(weather);
          setForecast(forecast);
        })
        .catch(() => setError('Could not fetch weather.'))
        .finally(() => setLoading(false));
    } else {
      setWeather(null);
      setForecast(null);
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if (onWeatherLoaded) onWeatherLoaded(weather, forecast);
  }, [weather, forecast, onWeatherLoaded]);

  if (loading) return (
    <div className="weather-display rounded-3xl shadow-2xl p-10 max-w-lg mx-auto mt-12 border border-[var(--lavender)] glass-card bg-floral-solid">
      <div className="h-32 flex flex-col justify-center items-center opacity-60">
        <div className="w-24 h-8 bg-[var(--sakura)]/40 rounded mb-4" />
        <div className="w-32 h-10 bg-[var(--jacaranda)]/30 rounded mb-2" />
        <div className="w-20 h-6 bg-[var(--lavender)]/30 rounded" />
      </div>
    </div>
  );
  if (error) return <div className="text-[var(--stormy)] bg-floral-solid rounded-lg p-4 shadow">{error}</div>;
  if (!weather) return null;

  return (
    <div className="flex flex-col items-center glass-card bg-floral-solid border border-[var(--lavender)] p-8 rounded-3xl shadow">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-7xl font-black text-[var(--jacaranda)] drop-shadow-lg">{weather.main.temp}°C</span>
        <span className="inline-block align-middle">
          <Image
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            width={64}
            height={64}
            className="w-16 h-16"
            unoptimized
          />
        </span>
      </div>
      <div className="mb-2 text-2xl capitalize text-[var(--lavender)] font-bold drop-shadow-sm">{weather.weather[0].description}</div>
      <div className="text-lg text-[var(--jacaranda)] font-semibold drop-shadow-sm mb-4">{weather.name}</div>
      <WeatherDetails weather={weather} />
    </div>
  );
};

export default WeatherDisplay;
