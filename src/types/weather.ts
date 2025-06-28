// src/types/weather.ts
// TypeScript types for OpenWeatherMap current weather response

export interface Weather {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  visibility: number;
  uvi?: number;
}
