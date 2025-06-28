// src/types/forecast.ts
// TypeScript types for OpenWeatherMap One Call API (forecast)

export interface HourlyForecast {
  dt: number;
  temp: number;
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

export interface DailyForecast {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

export interface Forecast {
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}
