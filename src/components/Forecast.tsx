// src/components/Forecast.tsx
import React from 'react';
import type { Forecast as ForecastType } from '../types/forecast';
import ForecastCard from './ForecastCard';

interface ForecastProps {
  forecast: ForecastType | null;
  mode: 'hourly' | 'daily';
}

const Forecast: React.FC<ForecastProps> = ({ forecast, mode }) => {
  if (!forecast) {
    // Skeleton loader for forecast
    return (
      <div className="forecast mt-6">
        <h3 className="font-bold mb-2 text-[var(--jacaranda)] text-lg">
          {mode === 'hourly' ? 'Hourly Forecast' : '7-Day Forecast'}
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: mode === 'hourly' ? 8 : 5 }).map((_, i) => (
            <div
              key={i}
              className="w-20 h-32 bg-[var(--sakura)]/30 rounded-2xl flex flex-col items-center justify-center animate-pulse"
            >
              <div className="w-10 h-10 bg-[var(--jacaranda)]/30 rounded-full mb-2" />
              <div className="w-12 h-4 bg-[var(--lavender)]/30 rounded mb-1" />
              <div className="w-8 h-3 bg-[var(--lavender)]/20 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="forecast mt-6">
      {mode === 'hourly' ? (
        <>
          <h3 className="font-bold mb-2 text-[var(--jacaranda)] text-lg">Hourly Forecast</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {forecast.hourly.slice(0, 24).map((hour, i) => (
              <ForecastCard
                key={hour.dt}
                time={new Date(hour.dt * 1000).getHours() + ':00'}
                temp={hour.temp}
                icon={hour.weather[0].icon}
                description={hour.weather[0].description}
                isActive={i === 0}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className="font-bold mt-4 mb-2 text-[var(--jacaranda)] text-lg">7-Day Forecast</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {forecast.daily.slice(0, 7).map((day, i) => (
              <ForecastCard
                key={day.dt}
                time={new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}
                temp={day.temp.max}
                icon={day.weather[0].icon}
                description={day.weather[0].description}
                isActive={i === 0}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Forecast;
