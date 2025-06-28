// src/components/WeatherDetails.tsx
import React from 'react';
import type { Weather } from '../types/weather';

interface WeatherDetailsProps {
  weather: Weather | null;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  if (!weather) return null;
  return (
    <div className="flex flex-wrap gap-3 justify-center w-full">
      {[
        { label: 'High', value: `${weather.main.temp_max}°C` },
        { label: 'Low', value: `${weather.main.temp_min}°C` },
        { label: 'Pressure', value: `${weather.main.pressure} hPa` },
        { label: 'Visibility', value: `${weather.visibility / 1000} km` },
        { label: 'UV Index', value: weather.uvi ?? 'N/A' },
        { label: 'Wind', value: `${weather.wind.deg}°` },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center px-4 py-2 rounded-full shadow-sm border border-[var(--lavender)] text-[var(--jacaranda)] font-medium text-base min-w-[110px] justify-center bg-floral-solid backdrop-blur-sm"
        >
          <span className="mr-2 text-[var(--lavender)] font-semibold">{item.label}:</span> <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;
