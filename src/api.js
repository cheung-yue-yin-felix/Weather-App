import { API_URL, CURRENT_WEATHER_KEY, FORECAST_WEATHER_KEY } from './config/settings'

async function fetchWeatherData(key, language, signal) {
  const url = API_URL
    .replace('{KEY}', key)
    .replace('{LANGUAGE}', language)

  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json()
}

export function fetchCurrentWeather(language, signal) {
  return fetchWeatherData(CURRENT_WEATHER_KEY, language, signal)
}

export function fetchForecast(language, signal) {
  return fetchWeatherData(FORECAST_WEATHER_KEY, language, signal)
}
