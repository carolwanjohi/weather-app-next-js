# Weatherly – Modern Next.js Weather App

A beautiful, mobile-first weather app built with Next.js 15, React 19, and Tailwind CSS. Inspired by the iOS Weather app, featuring a floral palette, glassmorphic UI, animated icons, and a theme toggle (floral/classic). City search is powered by a static city list for instant, privacy-friendly autocomplete.

## Features

- 🌸 Glassmorphic, floral-inspired UI with iOS-style header
- 🌗 Theme toggle (floral/classic), persistent via localStorage
- 🔍 City search with autocomplete (static list, fast & offline)
- 🌦️ Live weather and forecast from OpenWeatherMap
- 📊 Hourly and 7-day forecast with animated skeleton loaders
- ⚡ Mobile-first, responsive, and accessible

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local` (if present) or create `.env.local`:
     ```env
     NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
     NEXT_PUBLIC_API_BASE_URL=https://api.openweathermap.org/data/2.5
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` – Main app entry, layout, and global styles
- `src/components/` – UI components (WeatherDisplay, Forecast, CityAutocomplete, etc.)
- `src/services/` – Weather API and city list logic
- `public/cities.json` – Static city list for autocomplete

## Customization

- **Add cities:** Edit `public/cities.json` to add or remove cities for search/autocomplete.
- **Change theme colors:** Update Tailwind config and CSS variables in `globals.css`.

## Deployment

Deploy easily to [Vercel](https://vercel.com/) or any platform supporting Next.js 15.

## Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- UI inspiration: iOS Weather app
- Icons: [OpenWeatherMap](https://openweathermap.org/weather-conditions)

---

MIT License – Enjoy your weather app!
