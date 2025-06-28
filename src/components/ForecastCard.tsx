// src/components/ForecastCard.tsx
import React from 'react';

interface ForecastCardProps {
  time: string;
  temp: number;
  icon: string;
  description: string;
  isActive?: boolean;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ time, temp, icon, description, isActive }) => (
  <div
    className={`transition transform hover:scale-105 hover:shadow-xl glass-card bg-floral-solid border border-[var(--lavender)] backdrop-blur-lg rounded-2xl p-4 flex flex-col items-center min-w-[110px] max-w-[110px] w-[110px] h-[170px] justify-between ${isActive ? 'ring-2 ring-[var(--sakura)]' : ''}`}
    aria-label={`Forecast for ${time}: ${description}, ${temp}\u00b0C`}
    tabIndex={0}
  >
    <span className="text-xs text-[var(--jacaranda)] font-semibold mb-1">{time}</span>
    <img
      src={`https://openweathermap.org/img/wn/${icon}.png`}
      alt={description}
      className="w-8 h-8 mb-1"
    />
    <span className="text-lg font-bold text-[var(--jacaranda)]">{temp}°</span>
    <span className="text-xs text-[var(--lavender)] capitalize">{description}</span>
  </div>
);

export default ForecastCard;
