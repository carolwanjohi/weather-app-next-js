// src/services/weatherService.ts
// Service to interact with the weather API (OpenWeatherMap)

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCurrentWeatherByCoords(lat: number, lon: number) {
  // Fetch current weather from OpenWeatherMap
  const res = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error('Weather not found');
  return res.json();
}

export async function fetchCurrentWeatherByCity(city: string) {
  // Fetch current weather by city name from OpenWeatherMap
  const res = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error('Weather not found');
  return res.json();
}

export async function fetchForecastByCoords(lat: number, lon: number) {
  // Fetch 5-day forecast from OpenWeatherMap
  const res = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  if (!res.ok) throw new Error('Forecast not found');
  return res.json();
}

export async function fetchCities(query: string): Promise<{ city: string; country: string }[]> {
  if (!query) return [];
  // Fetch and filter static city list from public directory
  const res = await fetch('/cities.json');
  const cities: { city: string; country: string }[] = await res.json();
  return cities.filter(city => city.city.toLowerCase().startsWith(query.toLowerCase())).slice(0, 10);
}

export async function fetchWeatherAndForecastByCity(city: string) {
  // Fetch both weather and forecast from OpenWeatherMap
  const weatherRes = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
  const forecastRes = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
  if (!weatherRes.ok || !forecastRes.ok) throw new Error('Weather and forecast not found');
  const weather = await weatherRes.json();
  const forecastRaw = await forecastRes.json();

  // Transform OpenWeatherMap 3-hourly forecast to app's Forecast type
  // Hourly: next 24 3-hour intervals
  type OWMForecastItem = {
    dt: number;
    main: { temp: number };
    weather: Array<{ description: string; icon: string }>;
  };
  const hourly = (forecastRaw.list as OWMForecastItem[]).slice(0, 24).map((item) => ({
    dt: item.dt,
    temp: item.main.temp,
    weather: item.weather
  }));

  // Daily: group by day, take max temp and first weather for each day
  const daysMap: { [date: string]: OWMForecastItem[] } = {};
  (forecastRaw.list as OWMForecastItem[]).forEach((item) => {
    const date = new Date(item.dt * 1000).toISOString().split('T')[0];
    if (!daysMap[date]) daysMap[date] = [];
    daysMap[date].push(item);
  });
  const daily = Object.entries(daysMap).slice(0, 7).map(([, items]) => {
    const maxTemp = Math.max(...items.map(i => i.main.temp));
    const minTemp = Math.min(...items.map(i => i.main.temp));
    return {
      dt: items[0].dt,
      temp: { min: minTemp, max: maxTemp },
      weather: items[0].weather
    };
  });

  const forecast = { hourly, daily };
  return { weather, forecast };
}
