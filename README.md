# Hong Kong Weather App

A lightweight, mobile-friendly weather application built with React and Vite. It displays real-time weather data and a 9-day forecast for Hong Kong using the Hong Kong Observatory (HKO) Open Data API

[ [English](https://www.hko.gov.hk/en/abouthko/opendata_intro.htm) | [Traditional Chinese](https://www.hko.gov.hk/tc/abouthko/opendata_intro.htm) | [Simplified Chinese](https://www.hko.gov.hk/sc/abouthko/opendata_intro.htm) ]

## Features

- **Current Weather** — View live temperature and humidity readings from weather stations across Hong Kong districts
- **9-Day Forecast** — Browse an extended weather forecast with icons and daily conditions
- **District & Station Selection** — Choose from all 18 Hong Kong districts and their respective weather stations
- **Multi-language Support** — Toggle between English, Traditional Chinese (繁體中文), and Simplified Chinese (简体中文)
- **Auto-refresh** — Weather data refreshes automatically every hour
- **Persistent Settings** — Language, district, and station preferences are saved to localStorage
- **Responsive Design** — Optimized for both mobile and desktop viewing

## Tech Stack

- **Frontend:** React 19, Vite 8
- **Routing:** React Router (Hash Router)
- **Internationalization:** i18next + react-i18next
- **Styling:** CSS with custom properties
- **API:** Hong Kong Observatory Open Data API

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or any compatible package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd weather-app-v2

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The built files will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── api.js                  # HKO API fetch functions
├── App.jsx                 # Root component with providers
├── router.jsx              # Route definitions
├── utils.js                # Helper utilities
├── assets/
│   └── districts.js        # Hong Kong district & station data
├── components/
│   ├── CurrentWeather.jsx  # Current weather display
│   ├── ForecastCard.jsx    # Single forecast day card
│   └── ForecastList.jsx    # Forecast list container
├── config/
│   └── settings.js         # App constants (API URLs, defaults)
├── hooks/
│   ├── useSettings.jsx     # Settings context (language, district, station)
│   └── useWeather.js       # Weather data fetching with auto-refresh
├── i18n/
│   ├── index.js            # i18n configuration
│   └── locales/            # Translation files
│       ├── en.json         # English
│       ├── sc.json         # Simplified Chinese
│       └── tc.json         # Traditional Chinese
└── pages/
    ├── CurrentPage.jsx     # Current weather page
    ├── ForecastPage.jsx    # 9-day forecast page
    └── SettingsPage.jsx    # Language & location settings
```

## Configuration

Default settings can be adjusted in `src/config/settings.js`:

| Constant | Description |
|----------|-------------|
| `API_URL` | HKO Open Data API endpoint template |
| `CURRENT_WEATHER_KEY` | API key for current weather data (`rhrread`) |
| `FORECAST_WEATHER_KEY` | API key for forecast data (`fnd`) |
| `LANGUAGE` | Default language (`en`, `tc`, or `sc`) |
| `CURRENT_DISTRICT_*` | Default district name per language |
| `CURRENT_STATION_*` | Default weather station per language |
| `REFRESH_INTERVAL` | Auto-refresh interval in milliseconds (default: 1 hour) |

## Data Source

This application uses the [Hong Kong Observatory Open Data API](https://data.weather.gov.hk/weatherAPI/doc/HKO_Open_Data_API_Documentation.pdf). All weather data is provided by the Hong Kong Observatory.

## Acknowledgments

- Weather data provided by the [Hong Kong Observatory](https://www.hko.gov.hk/)
- Weather icons provided by HKO
